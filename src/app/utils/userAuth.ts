const userAuth = async (name: string, email: string) => { // to-do: return type?
    const res = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email}),
        credentials: 'include',
    })

    if(!res.ok) throw new Error('Auth failed'); //to-do: error boundary?

    console.log(res);

    return res;
};

export default userAuth;