
const Card = ({ title, value }) => (
    <div className="grid  sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
        <div className="hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm">
            <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                <div className="flex justify-center">
                    <dt className="sr-only">Nom</dt>
                    <dd className="group-hover:text-white font-semibold text-slate-900">
                        { title }
                    </dd>
                </div>
                <div>
                    <dt className="sr-only">Category</dt>
                    <dd className="group-hover:text-blue-200">{ value }</dd>
                </div>
            </dl>
        </div>
    </div>
)

export default Card;
