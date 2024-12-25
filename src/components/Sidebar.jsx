import React from 'react'
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdHistory } from "react-icons/md";
import { PiUserSquareThin } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { SiYoutubestudio } from "react-icons/si";
import { SiYoutubekids } from "react-icons/si";
import { MdOutlineWatchLater } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { SiTrendmicro } from "react-icons/si";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiFilmSlateLight } from "react-icons/pi";
import { CgMediaLive } from "react-icons/cg";
import { SiYoutubegaming } from "react-icons/si";
import { FaRegNewspaper } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { PiLightbulbLight } from "react-icons/pi";
import { SiStylelint } from "react-icons/si";
import { MdPodcasts } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import { GiLinkedRings } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useSelector } from 'react-redux';
const Sidebar = () => {
  const { theme } = useTheme();
  const { currentUser } = useSelector(state => state.user);

  const sidebarItems = [
    {
      id: 1,
      name: "Home",
      icon: <GoHome />,
      url: "/"
    },
    {
      id: 2,
      name: "Shorts",
      icon: <SiYoutubeshorts />,
      url: "/"
    },
    {
      id: 3,
      name: "Subscriptions",
      icon: <MdOutlineSubscriptions />,
      url: "/subscriptions"
    }
  ]
  const sidebarItems2 = [
    {
      id: 1,
      name: "Your Channel",
      icon: <PiUserSquareThin />,
      url: `/profile/${currentUser?._id}`

    },
    {
      id: 2,
      name: "History",
      icon: <MdHistory />,
    },
    {
      id: 3,
      name: "Playlists",
      icon: <MdOutlineSubscriptions />,
    },
    {
      id: 4,
      name: "Your Videos",
      icon: <BiVideo />,
    },
    {
      id: 5,
      name: "Watch later",
      icon: <MdOutlineWatchLater />,
    },
    {
      id: 6,
      name: "Liked videos",
      icon: <AiOutlineLike />,
    },
  ]

  const sidebarItems3 = [
    {
      id: 1,
      name: "Trending",
      icon: <SiTrendmicro />,
    },
    {
      id: 2,
      name: "Shopping",
      icon: <HiOutlineShoppingBag />,
    },
    {
      id: 3,
      name: "Music",
      icon: <SiYoutubemusic />,
    },
    {
      id: 4,
      name: "Films",
      icon: <PiFilmSlateLight />,
    },
    {
      id: 5,
      name: "Live",
      icon: <CgMediaLive />,
    },
    {
      id: 6,
      name: "Gaming",
      icon: <IoGameControllerOutline />,
    },
    {
      id: 7,
      name: "News",
      icon: <FaRegNewspaper />,
    },
    {
      id: 8,
      name: "Sport",
      icon: <TfiCup />,
    },
    {
      id: 9,
      name: "Courses",
      icon: <SiStylelint />,
    },
    {
      id: 10,
      name: "Fashion & beauty",
      icon: <PiLightbulbLight />,
    },
    {
      id: 11,
      name: "Podcasts",
      icon: <MdPodcasts />,
    },
  ];

  const sidebarItems4 = [
    {
      id: 1,
      name: "Youtube Premium",
      icon: <FaYoutube />,
    },
    {
      id: 2,
      name: "Youtube Studio",
      icon: <SiYoutubestudio />,
    },
    {
      id: 3,
      name: "Youtube Music",
      icon: <SiYoutubemusic />,
    },
    {
      id: 4,
      name: "Youtube Kids",
      icon: <SiYoutubekids />,
    },
  ];
  return (
    <div
      className={`px-6 w-full md:w-1/2 lg:w-1/3 hidden md:block h-[calc(100vh-6.625rem)] overflow-y-scroll hide-scrollbar overflow-x-hidden transition-all duration-300 ${theme === "dark" ? "bg-[#0f0f0f] text-gray-300" : "bg-white text-gray-700"
        }`}
    >
      <div className="space-y-3 items-center">
        {sidebarItems.map((item) => (
          <Link to={`${item?.url}`} key={item.id}>
            <div
              className={`space-x-6 flex items-center duration-300 rounded-xl p-1 ${theme === "dark"
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-300"
                }`}
            >
              <div className="text-xl cursor-pointer">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
      <br />
      <hr className={theme === "dark" ? "border-gray-700" : ""} />

      {/* You section */}
      <div className="space-y-3 mt-4 items-center">
        <div className="flex items-center space-x-2">
          <h1>You</h1>
          <FaChevronRight />
        </div>
        {sidebarItems2.map((item) => (
          < Link to={item.url?`${item?.url}`:`/`} key={item.id}>
            <div
              key={item.id}
              className={`space-x-6 flex items-center duration-300 rounded-xl p-1 ${theme === "dark"
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-300"
                }`}
            >
              <div className="text-xl cursor-pointer">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
      <br />
      <hr className={theme === "dark" ? "border-gray-700" : ""} />

      {/* Explore section */}
      <div className="space-y-3 mt-4 items-center">
        <h1 className="font-semibold">Explore</h1>
        {sidebarItems3.map((item) => (
          <div
            key={item.id}
            className={`space-x-6 flex items-center duration-300 rounded-xl p-1 ${theme === "dark"
                ? "hover:bg-gray-700"
                : "hover:bg-gray-300"
              }`}
          >
            <div className="text-xl cursor-pointer">{item.icon}</div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <br />
      <hr className={theme === "dark" ? "border-gray-700" : ""} />

      {/* More section */}
      <div className="space-y-3 mt-4 items-center">
        <h1 className="font-semibold">More From YouTube</h1>
        {sidebarItems4.map((item) => (
          <div
            key={item.id}
            className={`space-x-6 flex items-center duration-300 rounded-xl p-1 ${theme === "dark"
                ? "hover:bg-gray-700"
                : "hover:bg-gray-300"
              }`}
          >
            <div className="text-xl cursor-pointer text-[red]">
              {item.icon}
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <br />
      <hr className={theme === "dark" ? "border-gray-700" : ""} />

      {/* Footer */}
      <span
        className={`text-xs font-semibold ${theme === "dark" ? "text-gray-500" : "text-gray-600"
          }`}
      >
        About Press Copyright <br /> Contact us Creators <br /> Advertise
        Developers <br />
        <p className="mt-3">Terms Privacy Policy & Safety</p> How YouTube works{" "}
        <br /> Test new features
      </span>
      <br />
      <p
        className={`text-xs mt-3 ${theme === "dark" ? "text-gray-500" : "text-gray-600"
          }`}
      >
        © 2024 Deepak Varshney
      </p>
    </div>
  );
}

export default Sidebar
