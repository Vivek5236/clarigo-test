const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

                
                <div>
                    <h2 className="text-2xl font-bold text-white">VivekTech</h2>
                    <p className="mt-3 text-sm">
                        Building modern and scalable web applications using MERN Stack.
                    </p>
                </div>

            
                <div>
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">Home</li>
                        <li className="hover:text-white cursor-pointer">About</li>
                        <li className="hover:text-white cursor-pointer">Projects</li>
                        <li className="hover:text-white cursor-pointer">Contact</li>
                    </ul>
                </div>

        
                <div>
                    <h3 className="text-white font-semibold mb-3">Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">Web Development</li>
                        <li className="hover:text-white cursor-pointer">MERN Development</li>
                        <li className="hover:text-white cursor-pointer">API Development</li>
                        <li className="hover:text-white cursor-pointer">UI/UX Design</li>
                    </ul>
                </div>

            
                <div>
                    <h3 className="text-white font-semibold mb-3">Contact</h3>
                    <p className="text-sm">📧 vivek@email.com</p>
                    <p className="text-sm">📍 Bhopal, India</p>
                </div>

            </div>

        
            <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm">
                © 2026 Vivek Meena. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;