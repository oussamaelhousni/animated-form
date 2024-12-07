import { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

const delay = (time: number) => new Promise((res) => setTimeout(res, time));
function App() {
  const [status, setStatus] = useState("idle");
  const [ref, bounds] = useMeasure();

  console.log("height", bounds.height);
  console.log("satus", status);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    (async () => {
      if (status === "success") {
        await delay(1000);
        setIsVisible(false);
      }
    })();
  }, [status]);
  const onSubmit = async () => {
    setStatus("loading");
    await delay(1000);
    setStatus("success");
    setTimeout(() => setStatus("idle"), 10000);
  };
  return (
    <div className="w-screen h-screen bg-zinc-900 flex items-center justify-center">
      <motion.div className="border border-zinc-600 px-6 py-6 rounded-lg w-[400px] bg-zinc-800">
        <h3 className="text-zinc-400 font-semibold mb-4">Reset Password</h3>
        <motion.div
          animate={{ height: bounds.height > 0 ? bounds.height : "auto" }}
        >
          <div ref={ref}>
            <AnimatePresence mode="popLayout">
              {isVisible && (
                <motion.div
                  key={"ami"}
                  className="flex flex-col gap-4"
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-sm text-zinc-300">
                      Enter your email to get password reset link
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter your email"
                      className="px-3 py-4 text-sm h-7 rounded outline-none border border-violet-500"
                    />
                  </div>
                  <div className="flex w-full justify-end">
                    <button
                      className="bg-violet-600 h-7 min-w-28 text-white px-4 py-2 rounded flex items-center justify-center"
                      onClick={onSubmit}
                    >
                      {status === "idle" && <span>submit</span>}
                      {status === "loading" && (
                        <LuLoaderCircle className="animate-spin" />
                      )}
                      {status === "success" && <IoMdCheckmark />}
                    </button>
                  </div>
                </motion.div>
              )}
              {!isVisible && (
                <motion.p
                  className="text-zinc-300 text-base font-semibold"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                >
                  Email is sent! check your inbox
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence></AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
