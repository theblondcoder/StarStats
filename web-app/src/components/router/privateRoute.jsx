import Cookie from 'js-cookie'
import { Navigate } from 'react-router-dom'

export default function privateRoute({children}) {

    const accessToken= Cookie.get('accessToken');

    if(!accessToken){
        return <Navigate to={'/signin'}/>
    }
    return <>{children}</>
}
