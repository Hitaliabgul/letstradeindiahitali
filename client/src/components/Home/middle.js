import React from "react";

function middle() {
  return (
    <div className="flex justify-center">
      <div className="">
        <div className="py-3 w-72 text-2xl max-sm:w-95 max-sm:text-lg ">
          <p className="py-9 max-sm:py-5">
            It is very important to gain the knowledge firstly, and then enter
            into any trade in the world of the stock market. It is very
            essential to have inclusive knowledge and deep understanding to
            obtain true success in this world.
          </p>

          <p>
            The world of stock market is very large, it's also called the Ocean
            of money. The stock market attracts millions of people to earn money
            by investing a very few hours of the day. This market can give big
            profit on a small investment as well as it may take away a lot of
            money if done without knowledge. The stock market is not just about
            profit, the other side has a lot of risk and loss. In order to
            manage the risk, it is very important to know about the same. LTI
            provides one of the best sessions on Risk management which can help
            you to earn a lot of money. The courses of LTI cover almost
            everything of the share market. Risking the money is not a good
            option rather managing the money with proper risk management is
            essential.
          </p>
        </div>
      </div>
      <div class="flex items-center px-10 pl-24 abc">
         <img
          src={process.env.PUBLIC_URL + "/Images/Group-1.png"}
          className="rounded-2xl w-60"
          alt=""
         />
      </div>
    </div>
  );
}
export default middle;
