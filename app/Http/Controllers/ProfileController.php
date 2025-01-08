<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\User;
use Illuminate\Validation\Rule;


class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request, $call = 'web')
    {
        if ($call == 'api') {
            
            return response()->json([
                'status' => 'success',
                'data' => Auth::user()
            ]);
        }

        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request, $call = 'web')
    {
            $request->user()->fill($request->validated());

            if ($request->user()->isDirty('email')) {
                $request->user()->email_verified_at = null;
            }
        
            $request->user()->save();
            return Redirect::route('profile.edit')->with('status', 'profile-updated');
        
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request, $call = 'web')
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        if ($call == 'api') {

            $request->user()->currentAccessToken()->delete();

            $user->delete();
            
            return response()->json([
                'status' => 'success',
                'data' => 'User deleted successfully'
            ]);
        } 
        
        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    
        return Redirect::to('/');
    }


    public function api_update(Request $request)    
    {

        // In your controller method:
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique(User::class)->ignore(Auth::user()->id)],
        ]);
        
        $request->user()->fill($validated);

        $request->user()->save();

        return response()->json([
            'status' => 'success',
            'data' =>  $request->user(),
        ]);
    }
        
}
