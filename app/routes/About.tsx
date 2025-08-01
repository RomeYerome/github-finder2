import React from 'react'

const About: React.FC = () => {
    return (
        <div className="container mx-auto flex-1 px-4 pb-12 flex flex-col items-start justify-center">
            <h1 className="text-6xl mb-4">Github Finder</h1>
            <p className="mb-4 text-2xl font-light">
                A React app to search GitHub profiles and see profile details.
                This project is part of the
                <a href="https://www.udemy.com/course/modern-react-front-to-back/">
                    {' '}
                    React Front To Back
                </a>{' '}
                Udemy course by
                <strong>
                    <a href="https://traversymedia.com"> Brad Traversy</a>
                </strong>
                .
            </p>
            <p className="text-lg text-gray-400">
                Version <span className="text-gray-500">1.0.0</span>
            </p>
            <p className="text-lg text-gray-400">
                Layout By:
                <a
                    className="text-gray-500"
                    href="https://twitter.com/hassibmoddasser"
                >
                    Hassib Moddasser
                </a>
            </p>
        </div>
    )
}

export default About
