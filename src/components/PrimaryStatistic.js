import { 
        FaUsers, 
        FaLayerGroup, 
        FaBuilding,
        FaCodeBranch, 
        FaUserGraduate,
        FaUserTie
} from "react-icons/fa";

const PrimaryStatistic = ({ title, count }) => (
    
    <div className="flex flex-row rounded-sm bg-white items-center px-1 py-3 my-1">
        <div className="mx-1 bg-blue-500 p-2 rounded-sm">
            { title === "utilisateurs" && ((<FaUsers size={30} className="icon-color" />)) }
            { title === "sections" && ((<FaCodeBranch size={30} className="icon-color" />)) }
            { title === "groupes" && ((<FaLayerGroup size={30} className="icon-color" />)) }
            { title === "salles" && ((<FaBuilding size={30} className="icon-color" />)) }
            { title === "eleves" && ((<FaUserGraduate size={30} className="icon-color" />)) }
            { title === "enseignants" && ((<FaUserTie size={30} className="icon-color" />)) }
        </div>
        <div className="flex flex-col mx-4">
            <span className="leading-4 text-gray-500"> { count } { title } </span>
            <span className="leading-4 text-gray-500">13 actifs</span>
        </div>
    </div>
)

export default PrimaryStatistic;