import React, {useState} from "react";
import s from './auth-page.module.scss'

export function AuthPage() {
    const [state, setState] = useState({email: '', password: ''});

    function changeHandler(e) {
        setState({
        ...state, ...{[e.target.name]: e.target.value}
        })
    }

    async function handleSubmit(e) {
        try {
          e.preventDefault();
          const res = await fetch(
            'api/auth/reg',
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
            }
          )
          const json = await res.json();
          console.log(json);
        } catch (err) {
          console.error(err)
        }
    }
    return (
        <div className={s.container}>
          <h1>Hello App</h1>
          <form onSubmit={handleSubmit}>
            <input name="email" value={state.email} onChange={changeHandler}/>
            <input name="password" type="password" value={state.password} onChange={changeHandler}/>
            <input type="submit"/>
          </form>
        </div>
      );
}