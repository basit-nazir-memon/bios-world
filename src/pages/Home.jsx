import { useState, useEffect, useRef } from "react";
import "./Home.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Web3Modal from "web3modal";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "core-js/stable";
import "regenerator-runtime/runtime";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { abi } from "../abi";
import { ethers } from "ethers";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const divRef = useRef(null);
  const [click, setClick] = useState(false);
  const handleMenuClick = () => setClick(!click);
  const handleCoinClick = (name) => {
    setSelectedCoin(name);
    coins.forEach((coin) => {
      if (coin.name == name) {
        setSelectedCoinImgPath(coin.imagePath);
      }
    });
  };
  const closeMenu = () => setClick(false);
  const [barFill, setBarFill] = useState(80);
  const [selectedCoin, setSelectedCoin] = useState("BNB");
  const [selectedCoinImgPath, setSelectedCoinImgPath] = useState("/frame5.svg");
  const [Dicovery, setDiscovery] = useState(true);
  const [Education, setEducation] = useState(true);
  const [Restoration, setRestoration] = useState(true);
  const [Protection, setProtection] = useState(true);
  const [Sustainability, setSustainability] = useState(true);
  const targetDate = new Date("2023-08-07T00:00:00Z");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    tokenomics: useRef(null),
    roadmap: useRef(null),
    howtobuy: useRef(null),
  };
  const [activeSection, setActiveSection] = useState(sectionRefs.home);

  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [amount, setAmount] = useState(0);

  const [web3Modal, setWeb3Modal] = useState(null);
  const providerOptions = {
    binancechainwallet: {
      package: true,
    },
  };
  const [bnbRaised, setBnbRaised] = useState(0);
  const [bnbBalance, setBnbBalance] = useState(0);
  const [tokens, setToken] = useState(0);
  const [rate, setRate] = useState(5);
  const [walletAddress, setWalletAddress] = useState(
    "Wallet Address Not Found"
  );
  const [showInfo, setShowInfo] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 110 && !isMobile) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth <= 550) {
        setDiscovery(false);
        setEducation(false);
        setProtection(false);
        setSustainability(false);
        setRestoration(false);
      }
      if (window.innerWidth <= 1000) {
        setIsMobile(true);
      }
    };

    const updateTimer = () => {
      const timeDifference = targetDate - new Date();
      if (timeDifference <= 0) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      } else {
        setDays(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
        setHours(
          Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
        );
        setMinutes(
          Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
        );
        setSeconds(Math.floor((timeDifference % (1000 * 60)) / 1000));
      }
    };

   
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    document.addEventListener("mousedown", handleClickOutside);
    const timerInterval = setInterval(updateTimer, 1000);
    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    if (typeof window !== "undefined") {
      // console.log("window is defined");
      setWeb3Modal(
        new Web3Modal({
          cacheProvider: false,
          network: "mainnet",
          providerOptions, // required
        })
      );
    }
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
    console.log("called");
    

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(timerInterval);
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    // callback function to call when event triggers
    const onPageLoad = () => {
      // console.log('page loaded');
      setLoading(false);
      // do something else
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  // useEffect(() => {
  //   // connect automatically and without a popup if user is already connected
  //   if (web3Modal && web3Modal.cachedProvider) {
  //     // connect();
  //   }
  // }, [web3Modal]);

  // useEffect(() => {
  //   // const providerOptions = {
  //   //   // walletconnect: {
  //   //   //   package: WalletConnectProvider,
  //   //   //   infuraId: "0x914665f724be2257ff00139a4E7a5c519E8Fb6F1",
  //   //   // },
  //   //   binancechainwallet: { package: true },
  //   // };

  //   if (typeof window !== "undefined") {
  //     setWeb3Modal(
  //       new Web3Modal({
  //         cacheProvider: false,
  //         network: "mainnet",
  //         providerOptions, // required
  //       })
  //     );
  //   }
  //   if (typeof window.ethereum !== "undefined") {
  //     setHasMetamask(true);
  //   }
  // });

  // useEffect(() => {}, []);

  async function connect() {
    // alert("connect");
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3ModalProvider = await web3Modal.connect();
        //  setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        // const userAddress = await provider.getSigner().getAddress();
        // setAddress(userAddress);
        // setSigner(provider.getSigner());
        const network = await provider.getNetwork();
        const chainId = network.chainId;

        // console.log("Chain Id: " + chainId);
        if (chainId !== 56) {
          alert("Connect to BSC mainnet");
          return;
        }
        const accounts = await provider.listAccounts();
        const walletAddress = accounts[0];
        // console.log(walletAddress);
        setWalletAddress(walletAddress);
        setSigner(provider.getSigner());
        setIsConnected(true);

        const contractAddress = "0x914665f724be2257ff00139a4E7a5c519E8Fb6F1";
        const contract = await new ethers.Contract(
          contractAddress,
          abi,
          provider.getSigner()
        );
        try {
          const bnbBalance = await contract.progress();
          const realBnb = ethers.utils.formatEther(bnbBalance);
          setBnbBalance(realBnb);
          // console.log("Real BNB: " + realBnb);
          const boughtTokens = await contract.soldTokens();
          const realTokens = ethers.utils.formatUnits(boughtTokens);
          setToken(realTokens);
          // console.log("Real Tokens: " + realTokens);
          const rate = await contract.getRate();
          const formatRate = rate.toString();
          setRate(rate);
          // console.log("Format Rate: " + formatRate);
        } catch (error) {
          console.log(error);
        }

        // info();
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  // async function connect() {
  //   if (typeof window.ethereum !== "undefined") {
  //     try {
  //       const web3ModalProvider = await web3Modal.connect();
  //       //  setIsConnected(true);
  //       const provider = new ethers.providers.Web3Provider(web3ModalProvider);
  //       // setSigner(provider.getSigner());
  //       const network = await provider.getNetwork();
  //       const chainId = network.chainId;
  //       console.log(chainId);
  //       if (chainId !== 56) {
  //         alert("Connect to BSC mainnet");
  //         return;
  //       }
  //       const accounts = await provider.listAccounts();
  //       const walletAddress = accounts[0];
  //       console.log(walletAddress);
  //       setSigner(provider.getSigner());
  //       setIsConnected(true);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   } else {
  //     setIsConnected(false);
  //   }
  // }

  async function execute() {
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0x914665f724be2257ff00139a4E7a5c519E8Fb6F1";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      if (amount >= 0.001 && amount <= 2) {
        try {
          const balance = await contract.checkbalance();

          const formatBalance = ethers.utils.formatUnits(balance);
          // console.log(balance.toString());
          if (formatBalance == 0) {
            alert("Presale has not started");
            return;
          }
          const purchaseTokens = await contract.buyTokens({
            value: ethers.utils.parseEther(amount),
            gasLimit: 500000,
          });
          await purchaseTokens.wait();
          // console.log("Done");
          alert(
            "Tokens Bought! import into wallet using address 0x115cb5a223C417AA1f5afFDAaeF149d83dF3d794"
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("enter amount more than 0.001 and less than 2 BNB");
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  async function info() {
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0x914665f724be2257ff00139a4E7a5c519E8Fb6F1";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const bnbBalance = await contract.progress();
        const realBnb = ethers.utils.formatEther(bnbBalance);
        setBnbBalance(realBnb);
        // console.log("Real BNB: " + realBnb);
        const boughtTokens = await contract.soldTokens();
        const realTokens = ethers.utils.formatUnits(boughtTokens);
        setToken(realTokens);
        // console.log("Real Tokens: " + realTokens);
        const rate = await contract.getRate();
        const formatRate = rate.toString();
        setRate(rate);
        // console.log("Format Rate: " + formatRate);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const tableData = [
    {
      preSaleStage: 1,
      tokenPrice: 0.00008,
      amountOfTokens: 8750000000,
      TokenPercent: 12.5,
      TotalPrice: 700000,
    },
    {
      preSaleStage: 2,
      tokenPrice: 0.000095,
      amountOfTokens: 8750000000,
      TokenPercent: 12.5,
      TotalPrice: 831250,
    },
    {
      preSaleStage: 3,
      tokenPrice: 0.000105,
      amountOfTokens: 8750000000,
      TokenPercent: 12.5,
      TotalPrice: 918750,
    },
    {
      preSaleStage: 4,
      tokenPrice: 0.000115,
      amountOfTokens: 8750000000,
      TokenPercent: 12.5,
      TotalPrice: 1006250,
    },
    {
      preSaleStage: 5,
      tokenPrice: 0.000125,
      amountOfTokens: 8750000000,
      TokenPercent: 12.5,
      TotalPrice: 1093750,
    },
    {
      preSaleStage: 6,
      tokenPrice: 0.000135,
      amountOfTokens: 8750000000,
      TokenPercent: 12.5,
      TotalPrice: 1181250,
    },
    {
      preSaleStage: 7,
      tokenPrice: 0.000145,
      amountOfTokens: 8750000000,
      TokenPercent: 12.5,
      TotalPrice: 1268750,
    },
    {
      preSaleStage: 8,
      tokenPrice: 0.000155,
      amountOfTokens: 8750000000,
      TokenPercent: 12.5,
      TotalPrice: 1356250,
    },
  ];

  // async function connectNinfo() {
  //   await connect();
  //   console.log("Connect Done");
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   await info();
  //   console.log("Info Done");
  // }

  const coins = [
    {
      name: "ETH",
      imagePath: "/group2.svg",
    },
    {
      name: "USDT",
      imagePath: "/image-4@2x.png",
    },
    {
      name: "BNB",
      imagePath: "/frame5.svg",
    },
    {
      name: "USDT",
      imagePath: "/image-4@2x.png",
    },
  ];

  return (
    <>
    {loading ? (
    <div className="loader">
      <img src="/loader.gif" alt="loader" />
    </div>) :
    (
    <div className="mainScreen">
      <div className="mainComponent">
        <img
          className="MainImage"
          src="/hbg@2x.png"
          alt="Main Image"
          srcset=""
        />

        <div className="mainComponentItems">
          <div className="shadowTopMainComponent"></div>
          <div className="shadowBottomMainComponent"></div>
          <div
            className={isFixed && !isMobile ? "nav fixed" : "nav"}
            style={{
              padding: isFixed || isMobile ? "10px 15%" : "60px 15%",
            }}
          >
            <div className="logo">
              <img src="/bios-1@2x.png" alt="" srcset="" />
            </div>
            <div
              className="items"
              style={{ right: click ? "0%" : "-60%" }}
              ref={divRef}
            >
              <ul>
                <li
                  className={activeSection == "home" ? "active" : ""}
                  onClick={() => {
                    scrollToSection("home-section");
                    closeMenu();
                  }}
                >
                  Home
                </li>
                <li
                  className={activeSection === "about" ? "active" : ""}
                  onClick={() => {
                    scrollToSection("about-section");
                    closeMenu();
                  }}
                >
                  About
                </li>
                <li
                  className={activeSection === "tokenomics" ? "active" : ""}
                  onClick={() => {
                    scrollToSection("tokenomics-section");
                    closeMenu();
                  }}
                >
                  Tokenomics
                </li>
                <li
                  className={activeSection === "roadmap" ? "active" : ""}
                  onClick={() => {
                    scrollToSection("roadmap-section");
                    closeMenu();
                  }}
                >
                  Roadmap
                </li>
                <li
                  className={activeSection === "howtobuy" ? "active" : ""}
                  onClick={() => {
                    scrollToSection("howtobuy-section");
                    closeMenu();
                  }}
                >
                  How to Buy
                </li>
                <li
                  onClick={() => {
                    scrollToSection("home-section");
                    closeMenu();
                  }}
                >
                  FAQ
                </li>
              </ul>
            </div>
            <label id="icon" onClick={handleMenuClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </label>
          </div>
          <section ref={sectionRefs.home} id="home-section">
            <div
              className="mainContainer"
              style={{ marginTop: isFixed ? "170px" : "" }}
            >
              <div className="mainLeft">
                <p className="heading">
                  Meme animals trading pixels for petals in their grand home
                  coming to the{" "}
                  <span className="mainhighlight">Flora-Fauna Fiesta</span>
                </p>
                <p className="content">
                  Bios World is proud to call Earth our home! While some may
                  dream of exploring Mars, we believe in cherishing and
                  preserving the natural wonders of our planet. With outstanding
                  technology at our fingertips
                </p>
                <br />
                <div className="buyTokenParent" onClick={() => scrollToSection("buyTokens-section")}>
                  <div className="buyToken" >Buy Token</div>
                  <div className="tokenParentImg">
                    <img className="groupInner" alt="" src="/arrow-1.svg" />
                  </div>
                </div>
              </div>
              <div className="mainRight">
                <img src="/hbirds01-1.svg" alt="" srcset="" className="birds" />
                <img src="/htree.svg" alt="" srcset="" className="htree" />
                <img src="/elephant-1@2x.png" alt="" className="elephant" />
                <img
                  src="/tigerr-1@2x.png"
                  alt=""
                  srcset=""
                  className="tigerr"
                />
                <img src="/zebra-2@2x.png" alt="" srcset="" className="zebra" />
              </div>
            </div>
          </section>
        </div>
      </div>
      <section ref={sectionRefs.buyTokens} id="buyTokens-section">
        <div className="walletConnection">
          <div className="walletConnShadow1"></div>
          <div className="walletConnection hidden">
            <div className="walletImagesLeft">
              <img src="/group-42.svg" alt="" srcset="" className="walletTree" />
              <img src="/stone01-1.svg" alt="" srcset="" className="stone" />
              <img src="/owle-1@2x.png" alt="" srcset="" className="owl" />
            </div>
            <div className="walletConnectionRight">
              <div className="walletConnShadow2"></div>
              <div className="modal">
                <div className="m1">
                  <div className="m1-1">
                    <h5>{days}</h5>
                    <p>Days</p>
                  </div>
                  <div className="m1-1">
                    <h5>{hours}</h5>
                    <p>Hours</p>
                  </div>
                  <div className="m1-1">
                    <h5>{minutes}</h5>
                    <p>Minutes</p>
                  </div>
                  <div className="m1-1">
                    <h5>{seconds}</h5>
                    <p>Seconds</p>
                  </div>
                </div>
                <div
                  className="m2"
                  // style={{ display: isConnected ? "" : "none" }}
                >
                  <div
                    className="barlineFill"
                    style={{ width: bnbBalance / 315075 + "%" }}
                  ></div>
                  <p>Funds Raised</p>
                </div>
                <div
                  className="m3"
                  // style={{ display: isConnected ? "" : "none" }}
                >
                  BNB Raised: {bnbBalance} BNB / 315,075 BNB{" "}
                </div>
                <div
                  className="m4"
                  // style={{ display: isConnected ? "" : "none" }}
                >
                  <div className="bar"></div>
                  <div className="value">1 BNB = {rate.toString()} BIOSW</div>
                  <div className="bar"></div>
                </div>
                {/* <div
                  className="m5"
                  style={{ display: isConnected ? "" : "none" }}
                >
                  {coins.map((coin, index) => (
                    <div
                      className="coinContainer"
                      key={index}
                      onClick={() => handleCoinClick(coin.name)}
                      style={{
                        borderColor:
                          coin.name == selectedCoin ? "#40A072" : "#fff",
                      }}
                    >
                      <div className="coinLogo">
                        <img src={coin.imagePath} alt="" srcset="" />
                      </div>
                      <div className="coinName">
                        <p>{coin.name}</p>
                      </div>
                    </div>
                  ))}
                </div> */}
                <div className="m6">
                {"Address: " + walletAddress}
                  {/* {isConnected
                    ? "Address: " + walletAddress
                    : hasMetamask
                    ? "Please Connect Your Wallet to Purchase Tokens"
                    : "Please Install Meta Mask to Continue"} */}
                </div>
                <div
                  className="m6"
                  style={{ display: showInfo ? "block" : "none" }}
                >
                  BNB Balance: {bnbBalance.toString()}
                </div>
                <div
                  className="m6"
                  style={{ display: showInfo ? "block" : "none" }}
                >
                  Tokens: {tokens.toString()}
                </div>
                <div
                  className="m6"
                  style={{ display: showInfo ? "block" : "none" }}
                >
                  Rate: {rate.toString()}
                </div>
                <div
                  className="m7"
                  // style={{ display: isConnected ? "" : "none" }}
                ></div>
                <div
                  className="m8"
                  // style={{ display: isConnected ? "" : "none" }}
                >
                  <div className="m8Left">
                    <div className="m8LTop">Amount in {selectedCoin} you pay</div>
                    <div className="m8LBottom">
                      <input
                        type="number"
                        name=""
                        id=""
                        className="inputField"
                        placeholder="0"
                        value={amount}
                        onChange={() => {
                          setAmount(event.target.value);
                        }}
                      />
                      <img src={selectedCoinImgPath} alt="" />
                    </div>
                  </div>
                  <div className="m8Left">
                    <div className="m8LTop">Amount in BIOSW you recieve</div>
                    <div className="m8LBottom">
                      <input
                        type="number"
                        name=""
                        id=""
                        className="inputField"
                        placeholder="0"
                        value={amount * rate}
                        // onChange={() => {
                        //   setAmount(event.target.value / rate);
                        // }}
                      />
                      <img src="/biosw-11@2x.png" alt="" />
                    </div>
                  </div>
                </div>
                <div
                  className="m9"
                  // style={{ display: isConnected ? "" : "none" }}
                >
                  0.0015 {selectedCoin} is reserved for gas.The actual amount used
                  will depend on the network.
                </div>
                <div
                  className="m10"
                  style={{ display: isConnected ? "none" : "" }}
                  onClick={() => {
                    connect();
                  }}
                >
                  Connect Wallet
                </div>
                <div
                  className="m12"
                  style={{ display: isConnected ? "" : "none" }}
                >
                  <div className="m12btn" onClick={() => execute()}>
                    Buy Tokens
                  </div>
                  <div
                    className="m12btn"
                    onClick={() => {
                      info();
                      setShowInfo(!showInfo);
                    }}
                    style={{ display: "none" }}
                  >
                    {showInfo ? "Hide Info" : "Show Info"}
                  </div>
                </div>
                <div
                  className="m11"
                  // style={{ display: isConnected ? "" : "none" }}
                >
                  LISTING PRICE: $0.000155
                </div>
              </div>
              <img src="/bird01-1.svg" alt="" className="bird" />
              <img src="/11-1@2x.png" alt="" className="mouse" />
            </div>
          </div>
        </div>
      </section>
      <section ref={sectionRefs.about} id="about-section">
        <div className="BiosWorld">
          <div className="biosWorldShadow1"></div>
          <img src="/jungllegraphics.png" alt="" className="jungle" />
          <div className="BiosWorldLeft">
            <div className="Heading">
              <span className="mainhighlight">Welcome to Bios World</span> Where
              Memes, Money, and Mother Nature Meet
            </div>
            <div className="BiosWorldLeftPara">
              While others may be dreaming of Mars, here at Bios World, we're
              putting our roots down on Earth. Sure, technological advancement
              is exciting, but we believe our primary responsibility is
              protecting and preserving the beauty of our home planet.
            </div>
          </div>
          <div className="BiosWorldRight">
            <img src="/fox-1@2x.png" alt="" />
          </div>
        </div>
      </section>
      <div className="info">
        <div className="infoTop">
          <div className="infoTopItem">
            <div className="infoItem">
              <h5>Not Just a Meme Coin, a Mission</h5>
              <p>
                You've probably heard of meme coins. Maybe you've even dabbled
                in Doge or had a fling with Frog. But have you ever found a meme
                coin that stands for something? Enter BIOSW, the meme coin with
                a purpose beyond profit. Our aim? To make BIOSW a sustainable,
                stable crypto asset that helps protect biodiversity and save
                animals from extinction.
              </p>
            </div>
          </div>
          <div className="infoTopItem">
            <div className="infoItem">
              <h5>A Metaverse With A Message</h5>
              <p>
                BIOSW isn't just a token. It's the key to an NFTbased metaverse
                where technology meets the needs of the natural world. Our team
                is hard at work developing robust use cases, like an NFT
                marketplace and a bios game, to spread the word about the
                importance of biodiversity
              </p>
            </div>
          </div>
        </div>
        <div className="infoBottom">
          <div className="infoItem">
            <h5>Be A Part of The Change</h5>
            <p>
              As Bios World grows, we aim to amplify our message, spreading the
              urgency of preserving biodiversity far and wide. But we can't do
              it alone. We need you to join us in our mission to discourage
              deforestation, promote sustainable economic recovery, and foster a
              harmonious coexistence with nature. Your journey to protect and
              preserve our planet starts with a single BIOSW token. Welcome to
              Bios World, where we're turning memes into meaningful change.
              After all, who says you can't have fun while saving the world?
              Join us in our journey to protect and preserve our planet.
              Together, we can make a difference, one BIOSW token at a time.
            </p>
          </div>
        </div>
        <br />
        <br />
      </div>
      <section ref={sectionRefs.tokenomics} id="tokenomics-section">
        <div className="tokenomics">
          <div className="tokenomicsShadow1"></div>
          <img src="/09-1@2x.png" alt="" className="sloth" />
          <br />
          <br />
          <br />
          <div className="TokHeading">Tokenomics</div>
          <div className="totalSupply">
            100,000,000,000 <span className="mainhighlight">Total Supply</span>
          </div>
          <img src="combined.png" alt="" className="pieChart" />
          <div className="pieChartData">
            <div className="pieChartDataLeft">
              <p>8% Tax NFT's </p>
              <p>3 % distributed to seller</p>
              <p>4% distributed to holders</p>
              <p>1% to charity</p>
            </div>
            <div className="pieChartDataRight">
              <p>No Tax</p>
              <p>No Fees </p>
              <p>Liquidity Locked for 2 years </p>
              <p>Contract Renounced </p>
              <p>1B Airdrop</p>
            </div>
          </div>
          <br />
          <br />
        </div>
      </section>
      <div className="tokenInfo">
        <div className="TokHeading">Token Information</div>
        <div className="tokenInfoList">
          <div className="tokenInfoListLeft">
            <p>Name : BIOSW</p>
            <p>Token Symbol : BIOSW </p>
            <p>Blockchain : Binance Chain</p>
          </div>
          <div className="tokenInfoListRight">
            <p>Token Sale : Total Supply 100B </p>
            <p>BIOSW</p>
            <p>Presale : 70B</p>
          </div>
        </div>
        <div className="tableViewContainer">
          <table>
            <thead>
              <tr>
                <th>PreSale Stage</th>
                <th>Token Price</th>
                <th>Amount of Tokens</th>
                <th>Token Percentage</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.preSaleStage.toString().padStart(2, "0")}</td>
                  <td>{item.tokenPrice}</td>
                  <td>
                    {item.amountOfTokens.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>{item.TokenPercent + "%"}</td>
                  <td>
                    {(item.tokenPrice * item.amountOfTokens).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 2 }
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{ fontWeight: "bold" }}>Total</td>
                <td></td>
                <td>
                  {tableData
                    .reduce((sum, item) => sum + item.amountOfTokens, 0)
                    .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </td>

                <td>
                  {tableData.reduce((sum, item) => sum + item.TokenPercent, 0) +
                    "%"}
                </td>
                <td>
                  {tableData
                    .reduce(
                      (sum, item) =>
                        sum + item.tokenPrice * item.amountOfTokens,
                      0
                    )
                    .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <section ref={sectionRefs.roadmap} id="roadmap-section">
        <div className="roadMap">
          <img src="/group1.svg" alt="" className="roadMapTree" />
          <img src="/bbb01@2x.png" alt="" className="roadMapTree2" />
          <img src="/deer-1@2x.png" alt="" className="deer" />
          <img src="/12-1@2x.png" alt="" className="overDeer" />
          <img src="/1000-1@2x.png" alt="" className="mouseOnTree" />
          <div className="TokHeading roadmapHeading">Roadmap</div>
          <div className="roadMapPath">
            <div className="pathInfoTop">
              <div className="pathItem item1">
                <div className="pathHeading">Discovery</div>
                <br />
                <div
                  className="pathInfoPoints"
                  style={{ display: Dicovery ? "block" : "none" }}
                >
                  <p>Pre-sale Website </p>
                  <p>Pre-sale Live </p>
                  <p>10,000 Telegram Community</p>
                  <p>Media/PR</p>
                  <p>Social Channel Live</p>
                  <br />
                </div>
                <img
                  src="/path1.svg"
                  alt=""
                  className="pathItemImage"
                  onClick={() => {
                    Dicovery == true ? setDiscovery(false) : setDiscovery(true);
                  }}
                />
              </div>
              <div className="pathItem item3">
                <div className="pathHeading">Restoration</div>
                <br />
                <div
                  className="pathInfoPoints"
                  style={{ display: Restoration ? "block" : "none" }}
                >
                  <p>NFT Release </p>
                  <p>CrowdFunding Website Live</p>
                  <p>2nd Donation to Biodiversity</p>
                  <p> 60,000 Holders</p>
                  <p>60,000 community </p>
                  <p>Partnership</p>
                  <p>2nd Launch on DEX/CEX</p>
                  <p>Airdrop 500M </p>
                  <br />
                </div>
                <img
                  src="/path3.svg"
                  alt=""
                  className="pathItemImage"
                  onClick={() => {
                    Restoration == true
                      ? setRestoration(false)
                      : setRestoration(true);
                  }}
                />
              </div>
              <div className="pathItem item5" style={{}}>
                <div className="pathHeading">Education</div>
                <br />
                <div
                  className="pathInfoPoints"
                  style={{ display: Education ? "block" : "none" }}
                >
                  <p>Academy with AI tools</p>
                  <p>BIOS Gaming (P2E with cause)</p>
                  <p>ZOO on Metaverse Live </p>
                  <p>5% token to Charities</p>
                  <p>500,000 holders</p>
                  <p>100,000 Volunteers</p>
                  <p>1B Market Cap </p>
                  <p>BIOS Protocol</p>
                  <br />
                </div>
                <img
                  src="/path5.svg"
                  alt=""
                  className="pathItemImage"
                  onClick={() => {
                    Education == true
                      ? setEducation(false)
                      : setEducation(true);
                  }}
                  style={{ position: "absolute", right: "0%" }}
                />
              </div>
            </div>
            <img src="/path.svg" alt="" className="roadMapTrail" />
            <div className="pathInfoBottom">
              <div className="pathItem item2">
                <img
                  src="/path2.svg"
                  alt=""
                  className="pathItemImage"
                  onClick={() => {
                    Protection == true
                      ? setProtection(false)
                      : setProtection(true);
                  }}
                />
                <br />
                <br />
                <div
                  className="pathInfoPoints"
                  style={{ display: Protection ? "block" : "none" }}
                >
                  <p>Pre-sale Website </p>
                  <p>Pre-sale Live </p>
                  <p>10,000 Telegram Community</p>
                  <p>Media/PR</p>
                  <p>Social Channel Live</p>
                  <br />
                </div>
                <div className="pathHeading">Protection</div>
              </div>
              <div className="pathItem item4">
                <img
                  src="/path4.svg"
                  alt=""
                  className="pathItemImage"
                  onClick={() => {
                    Sustainability == true
                      ? setSustainability(false)
                      : setSustainability(true);
                  }}
                />
                <br />
                <br />
                <div
                  className="pathInfoPoints"
                  style={{ display: Sustainability ? "block" : "none" }}
                >
                  <p>NFT Release </p>
                  <p>CrowdFunding Website Live</p>
                  <p>2nd Donation to Biodiversity</p>
                  <p> 60,000 Holders</p>
                  <p>60,000 community </p>
                  <p>Partnership</p>
                  <p>2nd Launch on DEX/CEX</p>
                  <p>Airdrop 500M </p>
                  <br />
                </div>

                <div className="pathHeading">Sustainability</div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      </section>
      <div className="meetTeam">
        <div
          className="TokHeading roadmapHeading"
          style={{ marginTop: "300px" }}
        >
          Meet the Team
        </div>
        <div className="meetCards">
          <img src="/wolf.svg" alt="" className="wolf" />
          <div className="meetCardContainer">
            <div className="meetCard">
              <img src="/rectangle-58@2x.png" alt="" className="cardImg" />
              <div className="meetCardContent">
                <h4>Flora - Founder</h4>
                <h5>Tech-savvy Treehugger</h5>
                <p>
                  Our meme-tastic founder, is a true connoisseur of code who
                  swapped the concrete jungle for the heart of the rainforest.
                  Known for her genius in tech, she's as comfortable crafting
                  complex algorithms as she is identifying the calls of rare
                  birds.
                </p>
              </div>
            </div>
            <div className="meetCard">
              <img src="/rectangle-59@2x.png" alt="" className="cardImg" />
              <div className="meetCardContent">
                <h4>Fauna - Co-Founder</h4>
                <h5>Doctor-techie Championing Biodiversity</h5>
                <p>
                  Fauna is more than just a meme – she's a revolution. Armed
                  with a stethoscope in one hand and a keyboard in the other,
                  she's a genius doctor and tech enthusiast who's breaking
                  boundaries as the co-founder of Bios World.
                </p>
              </div>
            </div>
            <div className="meetCard">
              <img src="/rectangle-60@2x.png" alt="" className="cardImg" />
              <div className="meetCardContent">
                <h4>Bios Code Army</h4>
                <h5>Tech warriors Of The Wild</h5>
                <p>
                  The meme-tastic tech team that's traded office desks for
                  forest dens. Living in harmony with nature, they're the coding
                  champions behind Bios World, turning the whispers of the
                  wilderness into digital dialects.
                </p>
              </div>
            </div>
          </div>
        </div>
        <section ref={sectionRefs.howtobuy} id="howtobuy-section">
          <img src="/hill.svg" alt="" className="hill" />
          <div className="TokHeading howToBuy">How to Buy</div>
          <div className="TokHeading memify">
            Meme-ify Your Wallet with Biosw in 4 Simple Steps
          </div>
        </section>
      </div>

      <div className="howtoBuySection">
        <img src="/nature-monkey-1@2x.png" alt="" className="backImage" />
        <div className="buyGuidesContainer">
          <div className="buyGuide">
            <h5>1. Meme-ify Your Mobile:</h5>
            <div className="GuideCard">
              <p>
                To join the BIOSW brigade, you're going to need a crypto wallet.
                Trust Wallet, MetaMask, or another of your choice will do the
                trick. Pop over to the App Store or Google Play to snag one, or
                if you're on desktop, grab the MetaMask Chrome extension.
              </p>
            </div>
            <img src="/rabit-4@2x.png" alt="" className="guideCartoonImg" />
          </div>
          <div className="buyGuide">
            <h5>2. Feed Your Wallet with BNB:</h5>
            <div className="GuideCard">
              <p>
                Your wallet's got a serious hunger for some BNB, the magic key
                to unlock your BIOSW. You can grab some directly through
                MetaMask, transfer from another wallet, or buy on an exchange
                and withdraw it to your wallet. Remember to dance with the
                Binance Smart Chain BEP-20 network when you do.
              </p>
            </div>
            <img src="/turtle.svg" alt="" className="guideCartoonImg turtle" />
          </div>
          <div className="buyGuide">
            <h5>3. Unleash the Power of Uniswap:</h5>
            <div className="GuideCard">
              <p>
                It's time to connect to Uniswap, your portal to the BIOSW
                universe. We've made it super simple by embedding Uniswap right
                here on biosworld.io. If you're going solo on your browser, make
                sure you're on the official Uniswap site, select token, and
                paste in the official BIOSW token address.
              </p>
            </div>
            <img
              src="/crocodile.svg"
              alt=""
              className="guideCartoonImg crocodile"
            />
          </div>
          <div className="buyGuide">
            <h5>4. Make the Swap:</h5>
            <div className="GuideCard">
              <p>
                Now that you've got BNB in your wallet, you can swap it for some
                shiny BIOSW. Make sure you keep enough BNB for those gas fees,
                and then review and confirm your transaction. Congratulations!
                You're now a card-carrying member of the BIOSW brigade, making a
                real difference while having fun. Welcome to Bios World, where
                memes and nature unite!
              </p>
            </div>
            <img src="/cub.svg" alt="" className="guideCartoonImg cub" />
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <div className="footer">
        <div className="footerTop">
          <div className="left">
            <div className="leftItem">
              <img src="/bios-1@2x.png" alt="" className="Logo" />
              <p className="aboutcompany">
                Bios World boasts a team of committed specialists deeply
                invested in safeguarding the environment and advancing
                biodiversity. Our primary objective is to heighten the
                blockchain community's awareness of these crucial pursuits
                through dynamic initiatives such as the NFT marketplace and
                Farming game.
              </p>
            </div>
          </div>
          <div className="footerTopLinks">
            <div className="aboutUs">
              <ul>
                <li>
                  <p onClick={() => scrollToSection("about-section")}>
                    About Us
                  </p>
                </li>
                <li>
                  <p onClick={() => scrollToSection("tokenomics-section")}>
                    Tokenomics
                  </p>
                </li>
                <li>
                  <p>Charity Ambassadors</p>
                </li>
                <li>
                  <p onClick={() => scrollToSection("roadmap-section")}>
                    Roadmap
                  </p>
                </li>
                <li>
                  <a href="/BIOS_whitePaper.pdf">White Paper</a>
                </li>
                <li>
                  <p>NFT's</p>
                </li>
              </ul>
            </div>
            <div className="follo">
              <p className="followHead">Follow us on </p>
              <div className="follow">
                <ul>
                  <li>
                    <a href="https://t.me/+SHC0-kzuABk0NGQ5">
                      <div className="followOption">
                        <div className="img">
                          <i class="fa-brands fa-telegram"></i>
                        </div>
                        <div className="text">Telegram</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/biosworld23">
                      <div className="followOption">
                        <div className="img">
                          <i class="fa-brands fa-twitter"></i>
                        </div>
                        <div className="text">Twitter</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="https://web.facebook.com/biosworld?_rdc=1&_rdr">
                      <div className="followOption">
                        <div className="img">
                          <i class="fa-brands fa-facebook"></i>
                        </div>
                        <div className="text">Facebook</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="https://medium.com/@biosworld23">
                      <div className="followOption">
                        <div className="img">
                          <i class="fa-brands fa-medium"></i>
                        </div>
                        <div className="text">Medium</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/watch?v=BzYpt7u7Ozk">
                      <div className="followOption">
                        <div className="img">
                          <i class="fa-brands fa-youtube"></i>
                        </div>
                        <div className="text">YouTube</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:support@biosworld.io">
                      <div className="followOption">
                        <div className="img">
                          <i class="fa-regular fa-envelope"></i>
                        </div>
                        <div className="text">support@biosworld.io</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/Biosworld_Privacy_Policy.pdf">
                      <div className="followOption">
                        <div className="img">
                          <i class="fa-regular fa-file"></i>
                        </div>
                        <div className="text">Privacy Policy</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/BIOSW_Terms_Of_Service.pdf">
                      <div className="followOption">
                        <div className="img">
                          <i class="fa-solid fa-check-double"></i>
                        </div>
                        <div className="text">Terms of Service</div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/BIOSW_Disclaimer_&_Risk_Disclosure.pdf">
                      <div className="followOption">
                        <div className="img">
                          <i class="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <div className="text">Disclaimer</div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>© Copyright 2023. All Rights Reserved</p>
          {/* <div className="designedBy">
            <a href="https://www.hexlertech.com">
              <p>Website Developed By</p>
              <img src="/hexlerTech.png" alt="Hexler Tech Logo" />
            </a>
          </div> */}
        </div>
      </div>
    </div>) }
    
    </>
    
  );
};

export default Home;
