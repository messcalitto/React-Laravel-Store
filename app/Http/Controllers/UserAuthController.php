<?php

namespace App\Http\Controllers;

// use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use OpenAdmin\Admin\Facades\Admin;
use Illuminate\Notifications\Notifiable;
use App\Models\AdminUser;
use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;


class UserAuthController extends Controller
{   

    // public function register(Request $request)
    // {
    //     $validator = Validator::make($request->json()->all() , [
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|string|email|max:255|unique:users',
    //         'password' => 'required|string|min:6', 
    //     ]);

    //     if($validator->fails()){
    //             return response()->json($validator->errors()->toJson(), 400);
    //     }

    //     $user = User::create([
    //         'name' => $request->json()->get('name'),
    //         'email' => $request->json()->get('email'),
    //         'password' => Hash::make($request->json()->get('password')),
    //     ]);

    //     $token = JWTAuth::fromUser($user);

    //     return response()->json(compact('user','token'),201);
    // }
    
    public function AdminDetails(Request $request){

        $id = PersonalAccessToken::findToken($request->bearerToken())->tokenable_id;

        return response()->json(AdminUser::where('id', $id)
        ->select(['id', 'username', 'name'])
        ->first(), 200);
    }

    public function AdminUpdate(Request $request){

        $id = PersonalAccessToken::findToken($request->bearerToken())->tokenable_id;

        $user = AdminUser::where('id', $id)->first();

        $user->name = $request->name;
        $user->username = $request->username;
        
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        
        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'user' => AdminUser::where('id', $id)
                        ->select(['id', 'username', 'name'])
                        ->first()
        ]);
    }

    public function AdminLogin(Request $request) {
        // print bcrypt('1111');
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {

            return response()->json([
                'errors' => $validator->messages()
            ]);
            
        }

        $user = AdminUser::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response( [
                'errors' => ['message' => 'Invalid username or password']
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'username' => $user->name,
            'token' => $token,
            'message' => 'You have successfuly logged in'
        ]);
    }

    public function UserLogin(Request $request) {
        
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (Auth::attempt($credentials)) {

            // Authentication passed...
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response([
                'username' => $user->name,
                'token' => $token,
                'message' => 'You have successfuly logged in'
            ]);
        }
        
        return response()->json([
            'message' => 'Invalid email or password',
            'errors' => ['message' => 'Invalid Email or Password']
        ], 422);
        
    }

      /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function users(Request $request)
    {
        $request->pageSize = $request->pageSize ? $request->pageSize : 5;

        return response()->json(User::query()
            ->select(['id', 'name', 'email', 'created_at'])
            ->paginate($request->pageSize));
    }

     /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function UserDetails($id)
    {
        return response()->json(User::where('id', $id)
            ->select(['id', 'name', 'email', 'created_at'])
            ->first());
    }

    public function UserUpdate(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $data = [
            'name' => $request->name,
            'email' => $request->email
        ];

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        $emailExists = User::where('email', $request->email)
                ->where('id', '<>', $id)
                ->exists();

        if ($emailExists) {
            // Email exists
            return response()->json([
                'status' => 'error',
                'message' => 'This Email already exists. Please enter another one.' 
            ], 422 );  
        }
       
        $user->update($data);
    
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
        
    }

    public function UserCreate(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|max:255',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => implode(" ", $validator->messages()->all())
            ], 422 );   
        }

        $emailExists = User::where('email', $request->email)->exists();

        if ($emailExists) {
            // Email exists
            return response()->json([
                'status' => 'error',
                'message' => 'This Email already exists. Please enter another one.' 
            ], 422 );  
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ]);

    }

    public function UserDelete($id) 
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    public function Logout(Request $request){
       
        $token = $request->bearerToken();
        PersonalAccessToken::findToken($token)->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Admin logged out successfully'
        ]);
    }


    public function UserLogout(Request $request){
       
        // Log out the user
        Auth::logout();
        // $token = $request->bearerToken();
        // PersonalAccessToken::findToken($token)->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Admin logged out successfully'
        ]);
    }

    public function getAuthenticatedUser(Request $request)
    {
        
        // try {
        //     $headers = apache_request_headers(); //get header
        //     //print_r($headers);die;
        //     $request->headers->set('Authorization', $headers['authorization']);// set header in request

        //     $user = JWTAuth::parseToken()->authenticate();
        // } catch (Exception $e) {
        //     if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
        //         return response()->json(['status' => 'Token is Invalid']);
        //     }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
        //         return response()->json(['status' => 'Token is Expired']);
        //     }else{
        //         return response()->json(['status' => 'Authorization Token not found']);
        //     }
        // }

        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        
        return response()->json(compact('user'));
    }

}
