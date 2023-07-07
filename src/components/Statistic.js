import MyButton from '@/components/MyButton'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

const Statistic = ({ title, success, average, higher, lower, first, last, link }) => (
    <div className="flex flex-col justify-center mb-2 sm:mx-2 rounded-md border border-gray-200 bg-white pt-10 transition-shadow duration-300 hover:shadow-lg">
        
        <dt className="mb-2 text-md font-extrabold text-center">{ title }</dt>

        <div className="p-4 bg-white rounded-lg">
            <dl className="grid max-w-screen-lg grid-cols-1 gap-8 p-4 mx-auto text-gray-900 xl:grid-cols-2">
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 lg:mb-4 text-3xl font-extrabold">{ success }</dt>
                    <dd className="text-gray-500">Taux de réussite</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 lg:mb-4 text-3xl font-extrabold">{ average }</dt>
                    <dd className="text-gray-500">Moyenne générale</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 lg:mb-4 text-3xl font-extrabold">{ higher }</dt>
                    <dd className="text-gray-500">Moyenne la plus élévée</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 lg:mb-4 text-3xl font-extrabold">{ lower }</dt>
                    <dd className="text-gray-500">Moyenne la plus base</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 lg:mb-4 text-xl font-extrabold">{ first }</dt>
                    <dd className="text-gray-500">Premier</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 lg:mb-4 text-xl font-extrabold">{ last }</dt>
                    <dd className="text-gray-500">Dernier</dd>
                </div>
            </dl>
            
        </div>

        { link != "Ras" && (
            <MyButton>
                <div className="flex p-1 lg:py-3 flex-row items-center justify-center">
                    <Link href={link}>Voir plus</Link>
                    <BsArrowRight />
                </div>
            </MyButton>
        )}
        
    </div>
)

export default Statistic;