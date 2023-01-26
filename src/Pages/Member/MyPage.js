import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {preURL} from "../../preURL/preURL";
import {UserContext} from "../../_contextAPI/UserContext";
// Component
import Token from "../../Components/Token";
import Header from "../../Components/Header";
import MyVideo from "../../Components/Mypage/MyVideo";
import MyPly from "../../Components/Mypage/MyPly";
import Pagination from "../../Components/Mypage/Pagination";
// Style
import {
  BGdiv,
  Comments,
  Delete,
  Email,
  GotoPlyDiv,
  ImgWrapper,
  Nickname,
  RightWrapper,
  Title,
  Wrapper
} from "../../Style/MyPage";
import {StyledDivRow} from "../../Style/StyledDiv";
import StyledBtn from "../../Style/StyledBtn";
import {VideoList} from "../../Style/Video";
// Assets
import GotoPly from "../../Assets/Mypage_GotoSavedply.png";
import Eye from "../../Assets/Mypage_eye1.png";
import MyComment from "../../Components/Mypage/MyComment";


const MyPage = () => {
  const navigate = useNavigate();
  const token = Token();
  const [user,setUser] = useContext(UserContext);

  const [profileImg, setProfileImg] = useState("https://demo.ycart.kr/shopboth_farm_max5_001/data/editor/1612/cd2f39a0598c81712450b871c218164f_1482469221_493.jpg");
  const [profileName, setProfileName] = useState("닉넴");
  const [profileEmail, setProfileEmail] = useState("이메일");
  const [videos, setVideos] = useState([
    // {id: 1, title: "영상 1", likeCount: 5, thumbnailUrl: "", isPublic: null},
    // {id: 2, title: "영상 2", likeCount: 5, thumbnailUrl: "", isPublic: null},
    // {id: 3, title: "영상 3", likeCount: 5, thumbnailUrl: "", isPublic: null},
    // {id: 4, title: "영상 4", likeCount: 5, thumbnailUrl: "", isPublic: null},
    // {id: 1, title: "영상 1", likeCount: 5, thumbnailUrl: "", isPublic: null},
    // {id: 2, title: "영상 2", likeCount: 5, thumbnailUrl: "", isPublic: null},
    // {id: 3, title: "영상 3", likeCount: 5, thumbnailUrl: "", isPublic: null},
    // {id: 4, title: "영상 4", likeCount: 5, thumbnailUrl: "", isPublic: null}
  ]);
  const [totalVPage, setTotalVPage] = useState(0);
  const [videosPage, setVideosPage] = useState(0);
  const [playlist, setPlaylist] = useState([
    // {id: 1, title: "플리1", titleImageUrl: "https://i.ytimg.com/vi/xhyWDLWanHE/hqdefault.jpg?s…AFwAcABBg==&rs=AOn4CLDNC541Gll7yxMs9Vcc8MWtC9gzLg", likeCount: 3, isPublic: true},
    // {id: 2, title: "플리2", titleImageUrl: "https://i.ytimg.com/vi/MRaAcIQOIIw/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLDMAXcYHT37gxseIf6CA94ICpnTuQ", likeCount: 25, isPublic: true},
    // {id: 3, title: "플리3", titleImageUrl: "https://i.ytimg.com/vi/1ktnYFMm4S0/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLBRJHJTM-_VzaapK9oCWlD8t-K8WQ", likeCount: 3, isPublic: true},
    // {id: 4, title: "플리4", titleImageUrl: "https://i.ytimg.com/vi/Q2ehBSEkAzw/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLDgtPhu8WY4xOABtcCjVo5x-hgswA", likeCount: 22, isPublic: false},
    // {id: 5, title: "플리5", titleImageUrl: "https://i.ytimg.com/vi/mKkYQ2OwYYg/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLB-2wmECn5003TmXqION-Nqcgahzw", likeCount: 30, isPublic: false},
    // {id: 6, title: "플리6", titleImageUrl: "https://i.ytimg.com/vi/iiIcTPoIoZk/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLAjn_R-euhMSNKaCFjJzO89A93tAA", likeCount: 19, isPublic: false},
    // {id: 7, title: "플리7", titleImageUrl: "https://i.ytimg.com/vi/UfBxMDp7VTo/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLCJF-TybRxbbgYlWXiz2ARY6e-aHw", likeCount: 3, isPublic: false},
    // {id: 8, title: "플리8", titleImageUrl: "https://i.ytimg.com/vi/MzVRL5W4b1I/hqdefault.jpg?s…AFwAcABBg==&rs=AOn4CLDJ-2oHWJdsOn-YBOi9t52n0qepNw", likeCount: 3, isPublic: true}
  ]);
  const [totalPPage, setTotalPPage] = useState(0);
  const [plysPage, setPlysPage] = useState(0);
  const [comments1, setComments1] = useState([
    // {boardId: 1, boardType: "video", content: "댓글 내용 asdfawerjwaiefjad, vndsvasdfwefsafdafdfdaf", boardTitle: "게시글 제목", createdTime: [2023,1,14,23,50,12,323453]},
    // {boardId: 1, boardType: "video", content: "댓글 내용", boardTitle: "게시글 제목", createdTime: [2023,1,14,23,50,12,323453]},
    // {boardId: 1, boardType: "video", content: "댓글 내용", boardTitle: "게시글 제목", createdTime: [2023,1,14,23,50,12,323453]},
    // {boardId: 1, boardType: "video", content: "댓글 내용", boardTitle: "게시글 제목", createdTime: [2023,1,14,23,50,12,323453]},
    // {boardId: 1, boardType: "video", content: "댓글 내용", boardTitle: "게시글 제목", createdTime: [2023,1,14,23,50,12,323453]},
  ]);
  const [comments2, setComments2] = useState([
    // {boardId: 1, boardType: "video", content: "댓글 내용", boardTitle: "게시글 제목", createdTime: [2023,1,14,23,50,12,323453]},
    // {boardId: 1, boardType: "video", content: "댓글 내용", boardTitle: "게시글 제목", createdTime: [2023,1,14,23,50,12,323453]},
    // {boardId: 1, boardType: "video", content: "댓글 내용", boardTitle: "게시글 제목", createdTime: [2023,1,14,23,50,12,323453]},
    // {boardId: 1, boardType: "video", content: "댓글 내용", boardTitle: "게시글 제목", createdTime: [2023,1,14,23,50,12,323453]},
    // {boardId: 1, boardType: "video", content: "댓글 내용", boardTitle: "게시글 제목", createdTime: [2023,1,14,23,50,12,323453]}
  ]);
  const [totalCPage, setTotalCPage] = useState(0);
  const [commentsPage, setcommentsPage] = useState(0);


  // 게시한 영상 목록 불러오기
  useEffect(() => {
    axios
        .get(preURL + `/user/${user.id}/videos?page=${videosPage}`,{
          headers: {
            ITTASEKKI: token
          }
        })
        .then((res) => {
          console.log("👍게시한 영상 목록 불러오기 성공", res);
          setTotalVPage(res.data['totalPageCount']);
          setVideos(res.data['data']);
        })
        .catch((err) => {
          console.log("🧨게시한 영상 목록 불러오기 실패", err);
        })
  },[user, videosPage]);

  // 게시한 플리 목록 불러오기
  useEffect(() => {
    axios
        .get(preURL + `/user/${user.id}/playlists?page=${plysPage}`,{
          headers: {
            ITTASEKKI: token
          }
        })
        .then((res) => {
          console.log("👍게시한 플리 목록 불러오기 성공", res);
          setTotalPPage(res.data['totalPageCount']);
          setPlaylist(res.data['data']);
        })
        .catch((err) => {
          console.log("🧨게시한 플리 목록 불러오기 실패", err);
          if(err.status === 403) {
            alert('로그인 후 이용해주세요.');
            window.location.replace("/");
          }
        })
  },[user, plysPage]);

  // 게시한 댓글 목록 요청
  useEffect(() => {
    axios
        .get(preURL + `/user/${user.id}/comments?page=${commentsPage}`,{
          headers: {
            ITTASEKKI: token
          }
        })
        .then((res) => {
          console.log("👍게시한 댓글 목록 불러오기 성공", res);
          setTotalCPage(res.data['totalPageCount']);
          // 댓글 5개씩
          const Data = res.data['data'];
          let list1 = [], list2 = [];
          for(let i=0; i<Data.length; i++) {
            if(i<5) list1.push(Data[i]);
            else list2.push(Data[i]);
          }
          setComments1(list1);
          setComments2(list2);
        })
        .catch((err) => {
          console.log("🧨게시한 댓글 목록 불러오기 실패", err);
        })
  },[user, videosPage]);


  return (
      <>
        <Header />
        <Wrapper>
          <GotoPlyDiv>
            <StyledBtn onClick={() => navigate('/mypage/savedPly')}>저장한 플레이리스트</StyledBtn>
            <img src={GotoPly} alt="저장한 플레이리스트 아이콘" onClick={() => navigate('/mypage/savedPly')}/>
          </GotoPlyDiv>
          <BGdiv>
            <img src={Eye} alt="눈 이미지1" />
            {/*프로필 세팅*/}
            <StyledDivRow>
              <ImgWrapper>
                <img src={profileImg} alt="사용자 프로필 이미지" />
              </ImgWrapper>
              <RightWrapper>
                <Nickname>{profileName}</Nickname>
                <Email>{profileEmail}</Email>
              </RightWrapper>
            </StyledDivRow>
            {/*게시한 영상*/}
            <div>
              <Title>게시한 영상</Title>
              <VideoList>
                {videos.map((video) => {
                  return <MyVideo video={video}/>
                })}
              </VideoList>
              <Pagination page={videosPage} setPage={setVideosPage} totalPageCount={totalVPage}/>
            </div>
            {/*나의 플레이리스트*/}
            <div>
              <Title>나의 플레이리스트</Title>
              <VideoList>
                {playlist.map((ply) => {
                  return <MyPly ply={ply} />
                })}
              </VideoList>
              <Pagination page={plysPage} setPage={setPlysPage} totalPageCount={totalPPage} />
            </div>
            {/*게시한 댓글*/}
            <div>
              <Title>게시한 댓글</Title>
              <StyledDivRow>
                <Comments>
                  {comments1.map((comment) => {
                    return <MyComment comment={comment} />
                  })}
                </Comments>
                <Comments>
                  {comments2.map((comment) => {
                    return <MyComment comment={comment} />
                  })}
                </Comments>
              </StyledDivRow>
              <Pagination page={commentsPage} setPage={setcommentsPage} totalPageCount={totalCPage} />
            </div>
            {/*탈퇴하기*/}
            <div>
              <Delete>탈퇴하기</Delete>
            </div>
          </BGdiv>
        </Wrapper>
      </>
  );
};

export default MyPage;
