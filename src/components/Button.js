const Button = ({ type = 'submit', className, cancel, passed, ...props }) => {
    
    if (className && passed) {
        return (
            <button
                type={type}
                className={ 
                        !cancel ? 
                        `${className}`
                        :
                        `${className}`
                        }  
                {...props}
            />
        )
    } else {

        return (
            <button
                type={type}
                className={ 
                        !cancel ? 
                        `${className} inline-flex items-center px-2 py-1 bg-blue-500 border border-transparent rounded-md font-semibold text-medium text-white tracking-widest hover:bg-blue-600 active:bg-blue-600 focus:outline-none focus:border-blue-600 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150`
                        :
                        `${className} inline-flex items-center px-2 py-1 outline-1 border-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:border-transparent`
                        }  
                {...props}
            />
        )
    }
}

export default Button
