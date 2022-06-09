import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { useDispatch } from 'react-redux'
import { updateUser } from '@/redux/userReducer'

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const dispatch = useDispatch()
    dispatch(updateUser(user))
    console.log(user)
    //const user = useSelector((state) => state.userReducer.user)

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />

            {/* Page Heading */}
            <header className="">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
