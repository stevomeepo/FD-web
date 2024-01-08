export default function Contact() {
    return (
        <div className="bg-black-600 min-h-screen flex items-center justify-center">
            <div className="container mx-auto p-4 flex flex-wrap items-start">
                {/* Contact Information */}
                <div className="w-full lg:w-1/2 p-4">
                    <h2 className="text-4xl font-bold text-white mb-4">CONTACT US</h2>
                    <div className="text-white">
                        <p>1200 N. Van Buren St. STE A</p>
                        <p>Anaheim, CA 92807</p>
                        <p className="my-4">Call us 714.238.8888</p>
                    </div>
                    <div className="mt-8">
                        {/* Image here */}
                    </div>
                </div>
                {/* Contact Form */}
                <div className="w-full lg:w-1/2 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <form>
                            <div className="mb-4">
                                <input type="text" placeholder="Name" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="mb-4">
                                <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="Subject" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="mb-4">
                                <textarea placeholder="Type your message here..." className="w-full p-2 border border-gray-300 rounded h-32"></textarea>
                            </div>
                            <button type="submit" className="w-full p-3 bg-black text-white rounded hover:bg-red-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}