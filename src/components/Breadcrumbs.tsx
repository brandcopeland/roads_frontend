import React from 'react';
import { Link } from 'react-router-dom';

// Define the type for the Breadcrumbs props
interface BreadcrumbsProps {
  path: string; // Specify that 'path' is a string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path }) => {
    const paths: string[] = path.split('/').filter(Boolean); // Specify that 'paths' is an array of strings

    // Define the type for the pathNames object
    const pathNames: { [key: string]: string } = {
        roads: 'Дороги',
        payments: 'Оплаты',
        // Add more mappings as needed
    };

    return (
        <nav className="bg-slate-100 flex items-center space-x-2 text-white ml-8 mt-5 font-roboto text-lg">
            <Link to="/" className="text-gray-400 hover:text-gray-600">
                Главная
            </Link>
            {paths.map((segment: string, index: number) => ( // Specify types for 'segment' and 'index'
                <React.Fragment key={index}>
                    <span className="text-gray-400">/</span>
                    {index === paths.length - 1 ? (
                        <span className="text-gray-600">
                            {pathNames[segment] || segment} {/* TypeScript will now know the type of 'segment' */}
                        </span>
                    ) : (
                        <Link
                            to={`/${paths.slice(0, index + 1).join('/')}`}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            {pathNames[segment] || segment}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
