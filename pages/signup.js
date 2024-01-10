export default function Signup() {
    return (
      <div className="min-h-screen bg-black-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-black mb-6">Sign Up</h2>
          <form>
            <div className="mb-6">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
            </div>
            <div className="mb-6">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" />
            </div>
            <div className="mb-6">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" type="password" placeholder="********" />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }