import DAOM from "../images/DAOM.png";
import DarkmodeToggle from "./DarkmodeToggle";
import Metamask from "../images/Metamask.png";
import TopPopup from "./TopPopup";
import { Link } from "react-router-dom";
import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
import DropDown from "./DropDown";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import defaultProfileImage from "../images/img.png";

const Header = ({ profileImage }) => {
  const { sdk } = useSDK();
  const [account, setAccount] = useState("");
  const [view, setView] = useState(false);

  const onClickMetaMask = async () => {
    try {
      const accounts = await sdk?.connect();

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // 관리자 계정 등록 기능입니다. 뒤에 추가로 입력하면 되고 입력하게 되면
  // 우측 상단 마이페이지 아래 관리자 페이지가 추가됩니다. 프로젝트 제출 전 .env 처리 예정. 안 쓰는 계정 주소 입력 추천드립니다.
  // ** Admin.jsx에서 추가로 주소를 입력해야 정상적으로 관리자 페이지에 접속이 가능합니다.
  const isAdmin =
    account.toLowerCase() === "0xe3cd9fc292b724095874522026fb68932329296c" ||
    account.toLowerCase() === "0xeffc9eaf0cb26b4ca0614ea99aca0908ca468fb3" ||
    account.toLowerCase() === "메타마스크 주소 입력" ||
    account.toLowerCase() === "메타마스크 주소 입력" ||
    account.toLowerCase() === "메타마스크 주소 입력";

  return (
    <>
      <TopPopup />
      <header className="text-gray-600 pb-16 body-font dark:text-white dark:bg-slate-800">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link to="/">
            <div className="flex mt-1 title-font font-medium items-center text-gray-900 mb-4 md:mb-0 dark:text-white">
              <img src={DAOM} alt="DAOM" className="mr-2 w-32 pb-4" />
            </div>
          </Link>
          <div className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <DropDown />
          </div>

          <div>
            <DarkmodeToggle />
          </div>
          <div className="pl-6 mr-2">
            {account ? (
              <div className="w-[170px] flex">
                <ul
                  className="flex items-center"
                  onClick={() => {
                    setView(!view);
                  }}
                >
                  {/* 프로필 이미지만 표시 */}
                  <div className="ml-auto flex items-center">
                    <img
                      src={profileImage || defaultProfileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full cursor-pointer object-cover"
                    />
                  </div>
                  {/* 프로필 이미지만 표시 */}
                  {view ? (
                    <MdKeyboardArrowUp className="w-6 h-6 hover:cursor-pointer" />
                  ) : (
                    <MdKeyboardArrowDown className="w-6 h-6 hover:cursor-pointer" />
                  )}
                  {view && (
                    <>
                      <ul className="absolute mt-2 bg-slate-300 dark:bg-slate-600 top-28 p-4 rounded-xl">
                        <li className="pb-4">
                          <Link to="/MyPage">마이페이지</Link>
                        </li>
                        {isAdmin && (
                          <li className="pb-4">
                            <Link to="/Admin">관리자페이지</Link>
                          </li>
                        )}
                        <button
                          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-50"
                          onClick={() => setAccount("")}
                        >
                          로그아웃
                        </button>
                      </ul>
                    </>
                  )}
                </ul>
              </div>
            ) : (
              <button
                onClick={onClickMetaMask}
                className="flex items-center w-[170px]"
              >
                <img src={Metamask} alt="Metamask" className="w-8 mr-2" />
                <span>Sign in</span>
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
