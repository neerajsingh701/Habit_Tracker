


import { NavLink } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-[#0f0828] text-gray-300 mt-10">
            <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

                {/* left section */}
                <div>
                    <a href="/">
                        <h2 className="text-2xl font-bold text-red-400 hover:text-red-600 transitions"> Habit Tracker</h2>
                    </a>
                    <p className="mt-3 text-sm">Harness the power of our personalized habit tracker app to streamline your everyday routines and achieve your goals.</p>
                </div>

                {/* center section */}
                <div>

                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <NavLink to="/" className="text-white active:text-red-600 hover:text-red-600 transitions">Login</NavLink>
                        <NavLink to="/projects" className="text-white active:text-red-600 hover:text-red-600 transitions">Register</NavLink>
                    </div>
                </div>


                {/* Right section */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Connect with me</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <a href="https://github.com/neerajsingh701" className="text-white hover:text-red-600 transitions">GitHub</a>
                        <a href="https://www.linkedin.com/in/neerajsingh521/" className="text-white hover:text-red-600 transitions">LinkedIn</a>
                        <a href="#" className="text-white hover:text-red-600 transitions">Twitter</a>

                    </div>
                </div>
            </div>

            {/* this is the bottom line */}
            <div className="border-t border-gray-700 text-center py-4 text-sm">
                © {new Date().getFullYear()} Neeraj. All rights reserved.
            </div>
        </footer>
    )
}


export default Footer
