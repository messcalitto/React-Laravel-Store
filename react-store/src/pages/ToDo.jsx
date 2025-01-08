import { useActionState } from "react";

async function increment(previousState, formData) {
  
  await new Promise(resolve => setTimeout(resolve, 500));

  return formData.get('name') + " added to the cart";
}

function ToDo({}) {
  
  const [message, formAction, ispending] = useActionState(increment, '');

  return (
    <form action={formAction}>
      {message} <br/>
      <input type="text" name="name"></input>
      <button type="submit">Increment</button>
      &nbsp;&nbsp;
      {ispending ? "Pending..." : message}
    </form>
  )
}

export default ToDo