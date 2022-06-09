const Textarea = ({ disabled = false, className, ...props }) => (
    <textarea
        disabled={disabled}
        className={`${className} mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50`}
        {...props}
    >
    </textarea>
)

export default Textarea
