import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import defaultProfileImage from "../images/img.png";

const MyProfile = ({ onImageChange, onDeleteImage }) => {
  const [address, setAddress] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || defaultProfileImage
  );
  const [previewImage, setPreviewImage] = useState(profileImage);

  const handleChangeImage = (event) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageURL = reader.result;
      // 이미지 변경 함수 호출
      onImageChange(imageURL);
      // 로컬 스토리지에 이미지 URL 저장
      localStorage.setItem("profileImage", imageURL);
    };

    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(defaultProfileImage);
    setPreviewImage(defaultProfileImage);
    // 로컬 스토리지에서 이미지 URL 제거
    localStorage.removeItem("profileImage");
    onDeleteImage(defaultProfileImage);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      });
    }
  }, []);

  const handleHover = () => {
    setShowPopup(true);
  };

  const handleLeave = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          {/* 프로필 이미지 미리보기 */}
          <div className="container px-5 py-8 mx-auto flex flex-wrap">
            <div className="mb-4 md:w-2/5 flex justify-center">
              <img
                src={previewImage}
                alt="프로필 이미지 미리보기"
                className="w-32 h-32 rounded-full mb-2 object-cover"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
            {/* 파일 선택, 이미지 변경 및 이미지 삭제 버튼 */}
            <div className="flex items-center md:w-3/5">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleChangeImage(e);
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                }}
                id="profileImageInput"
                style={{ display: "none" }}
              />
              <label
                htmlFor="profileImageInput"
                className="cursor-pointer bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                이미지 선택
              </label>
              <button
                onClick={handleImageDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                이미지 삭제
              </button>
            </div>
          </div>
          {/* 파일 선택, 이미지 변경 및 이미지 삭제 버튼 */}
          {/* 메타마스크 주소 */}
          <div className="container px-5 py-8 mx-auto flex flex-wrap">
            <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5 text-center flex items-center justify-center">
              나의 MetaMask 주소
            </h2>
            <div className="md:w-3/5 md:pl-6 flex">
              <p className="leading-relaxed text-xl">
                현재 로그인된 주소는 {address.substring(0, 7)}...
                {address.substring(address.length - 5)} 입니다.
              </p>
              <div
                className="mt-1 ml-4 text-blue-500 relative cursor-pointer"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                주소 자세히 보기
                {showPopup && (
                  <div className="absolute bg-white p-2 text-sm text-gray-900 rounded shadow">
                    {address}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* 메타마스크 주소 */}
          {/* 목록 */}
          <div className="container px-5 py-8 mx-auto flex flex-wrap">
            <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5 text-center flex items-center justify-center">
              목록
            </h2>
            <div className="md:w-3/5 md:pl-6">
              <p className="leading-relaxed text-xl">목록</p>
            </div>
          </div>
          {/* 목록 */}
        </section>
      </Layout>
    </div>
  );
};

export default MyProfile;
