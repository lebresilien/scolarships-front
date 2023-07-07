const MyButton = ({ type = 'submit', ...props }) => {
    return (
        <button
            type={type}
            className="bg-blue-500 border border-transparent font-semibold text-medium text-white tracking-widest hover:bg-blue-600 active:bg-blue-600 focus:outline-none focus:border-blue-600 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150" 
            {...props}
        />
    )
}

export default MyButton
