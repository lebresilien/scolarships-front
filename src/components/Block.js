
const Block = ({ classroom }) => (

    <div className="p-4 bg-white rounded-lg md:p-8">
        <dl className="grid max-w-screen-lg grid-cols-1 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-2 xl:grid-cols-3 sm:p-8">
            <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">{ classroom.count }</dt>
                <dd className="text-gray-500">Nombre total d'élèves</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">{ classroom.count_men }</dt>
                <dd className="text-gray-500">Nombre de garçons</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">{ classroom.count_girl }</dt>
                <dd className="text-gray-500">Nombre de filles</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">{ classroom.max_age }</dt>
                <dd className="text-gray-500">Age maximale</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">{ classroom.min_age }</dt>
                <dd className="text-gray-500">Age minimale</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">{ classroom.average_age }</dt>
                <dd className="text-gray-500">Age moyenne</dd>
            </div>
        </dl>
    </div>
)

export default Block;