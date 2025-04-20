const Footer = () => {
    return (
      <footer className="bg-white dark:bg-gray-800 shadow-inner py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">BookBazaar</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Your online marketplace for books</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 font-semibold mb-2">Quick Links</h3>
                <ul className="text-gray-600 dark:text-gray-300 text-sm">
                  <li className="mb-1"><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</a></li>
                  <li className="mb-1"><a href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400">Login</a></li>
                  <li className="mb-1"><a href="/register" className="hover:text-indigo-600 dark:hover:text-indigo-400">Register</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-800 dark:text-gray-100 font-semibold mb-2">Categories</h3>
                <ul className="text-gray-600 dark:text-gray-300 text-sm">
                  <li className="mb-1"><a href="/?category=fiction" className="hover:text-indigo-600 dark:hover:text-indigo-400">Fiction</a></li>
                  <li className="mb-1"><a href="/?category=non-fiction" className="hover:text-indigo-600 dark:hover:text-indigo-400">Non-Fiction</a></li>
                  <li className="mb-1"><a href="/?category=educational" className="hover:text-indigo-600 dark:hover:text-indigo-400">Educational</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} BookBazaar. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  