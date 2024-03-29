import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";

const CheckAuth = ({ Component, pageProps }) => {
    const  { data : session, status } = useSession()
    const router = useRouter()


    useEffect(() => {
        if(status === 'loading') return
        
        if (!session) {
            router.push('/auth/signin')
        }
    }, [router, session, status])

    if (session){
        return <Component {...pageProps} />
    } 

    return ''


}

export default CheckAuth