import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-800 px-6 py-10">
            {/* Top App Download Section */}
            <div className="flex flex-col md:flex-row justify-center items-center pb-6 mb-6 gap-4">
                <h2 className="text-lg font-semibold mb-4 md:mb-0">
                   <b>For better experience, download the Swiggy app now</b>
                </h2>
                <div className="flex gap-4">
                    <img
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
                        alt="Google Play"
                        className="w-36"
                    />
                    <img
                        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                        alt="App Store"
                        className="w-32"
                    />
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">
                {/* Logo */}
                <div className="col-span-2 md:col-span-1">
                    <div className="flex flex-col gap-2">
                        <img
                            src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
                            alt="Swiggy Logo"
                            className="w-20"
                        />
                        <p className="text-gray-600">© {new Date().getFullYear()} Swiggy Limited</p>
                    </div>
                </div>

                {/* Company */}
                <div>
                    <h4 className="font-bold mb-2">Company</h4>
                    <ul className="space-y-1 text-gray-700">
                        <li>About Us</li>
                        <li>Swiggy Corporate</li>
                        <li>Careers</li>
                        <li>Team</li>
                        <li>Swiggy One</li>
                        <li>Swiggy Instamart</li>
                        <li>Swiggy Dineout</li>
                        <li>Swiggy Genie</li>
                        <li>Minis</li>
                        <li>Pyng</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-bold mb-2">Contact us</h4>
                    <ul className="space-y-1 text-gray-700">
                        <li>Help & Support</li>
                        <li>Partner with us</li>
                        <li>Ride with us</li>
                    </ul>

                    <h4 className="font-bold mt-4 mb-2">Legal</h4>
                    <ul className="space-y-1 text-gray-700">
                        <li>Terms & Conditions</li>
                        <li>Cookie Policy</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* Locations */}
                <div>
                    <h4 className="font-bold mb-2">Available in:</h4>
                    <ul className="space-y-1 text-gray-700">
                        <li>Bangalore</li>
                        <li>Gurgaon</li>
                        <li>Hyderabad</li>
                        <li>Delhi</li>
                        <li>Mumbai</li>
                        <li>Pune</li>
                    </ul>
                    {/* <select className="mt-2 border border-gray-300 rounded px-2 py-1 text-sm">
                        <option>679 cities</option>
                    </select> */}
                </div>

                {/* Life at Swiggy */}
                <div>
                    <h4 className="font-bold mb-2">Life at Swiggy</h4>
                    <ul className="space-y-1 text-gray-700">
                        <li>Explore with Swiggy</li>
                        <li>Swiggy News</li>
                        <li>Snackables</li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="font-bold mb-2">Social Links</h4>
                    <div className="flex gap-3 text-gray-700 text-xl">
                        <i className="fi fi-brands-linkedin"></i>
                        <i className="fi fi-brands-instagram"></i>
                        <i className="fi fi-brands-facebook"></i>
                        <i className="fi fi-brands-pinterest"></i>
                        <i className="fi fi-brands-twitter"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
}
