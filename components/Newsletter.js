export default function Newsletter() {
    const handleSubmit = (event) => {
      event.preventDefault()
      const email = event.target.elements[0].value
      // Send the email to your newsletter service...
    }
  
    return (
      <div className="newsletter bg-gray-100 p-10 rounded-md mt-10">
        <h2 className="text-2xl font-bold mb-2">Newsletter</h2>
        <p className="text-gray-700 mb-5">Sign up to receive updates on new arrivals and special offers.</p>
        <form onSubmit={handleSubmit} className="flex">
          <input input type="email" placeholder="Your email" className="flex-grow max-w-lg rounded-l-md p-2 border-t mr-0 border-b border-l border-gray-200 focus:outline-none focus:border-blue-500" />
          <button type="submit" className="px-8 rounded-r-md bg-red-500 hover:bg-black text-white hover:text-white font-bold p-2 uppercase border-red border-t border-b border-r">Join</button>
        </form>
      </div>
    )
  }