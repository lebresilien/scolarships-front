const Button = ({ type = 'submit', className, cancel, ...props }) => {
        return (
            <button
                type={type}
                className={ 
                        !cancel ? 
                        `${className} inline-flex items-center px-2 py-1 bg-blue-500 border border-transparent rounded-md font-semibold text-medium text-white tracking-widest hover:bg-blue-600 active:bg-blue-600 focus:outline-none focus:border-blue-600 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150`
                        :
                        `${className} inline-flex items-center justify-center px-2 py-1 bg-red-500 border border-transparent rounded-md font-semibold text-medium text-white tracking-widest hover:bg-red-600 active:bg-red-600 focus:outline-none focus:border-red-600 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150`
                        }  
                {...props}
            />
        )
}

export default Button
