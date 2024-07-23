"use client";
import { useEffect, useState } from "react";
import food from "@/app/assets/pexels-xmtnguyen-699953.jpg";
import Image from "next/image";

const StepSection = () => {
  const [sections, setSections] = useState([]);

  return (
    <div>
      <div className="flex flex-col mt-4">
        <div className="w-full rounded flex flex-col items-center">
          <span className="bg-green-500 my-4 text-white text-xl font-semibold w-8 h-8 flex items-center justify-center py-1 px-2 rounded-full">
            1
          </span>
          <div className="text-left">
            <p className="text-black font-semibold text-base">
              Zaki samu tarwadarki ki wanke da ruwan dumi idan zaki wanke ana so
              kisa lemon tsami saboda ta cire mata santsi jikin ta da kuma
              qarnin da take dashi idan kin game saiki ajjeta a gefe kisata a
              sitima dan ruwan jikin ya tsane abunda yasa akeso kibari ruwan
              jikinta ya tsane saboda wajen suya kada ta ragargaje
            </p>
            <div className="flex flex-wrap w-full">
              <div className="w-1/3 p-2">
                <div className="w-full h-32 flex items-center justify-center relative mb-4">
                  <Image
                    src={food}
                    alt=""
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
              <div className="w-1/3 p-2">
                <div className="w-full h-32 flex items-center justify-center relative mb-4">
                  <Image
                    src={food}
                    alt=""
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSection;
