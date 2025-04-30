import { IconButton } from "@mui/material"
import { getUserIdByToken } from "../store/getFromToken"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addVote, deleteVote } from "../redux/imageSlice";
import { useEffect, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const Vote = ({ imageId, challengeId }: { imageId: number, challengeId: number }) => {
    const userId = getUserIdByToken();
    const dispatch = useDispatch<AppDispatch>();
    // const vote=
    useSelector((state: RootState) => state.images.imagesByChallenge);
    const challenge = useSelector((state: RootState) => state.challenges.selectedChallenge);
    const [isVote, setIsVote] = useState<boolean>();
    const [token, _] = useState<string | null>(sessionStorage.getItem('token'))
    //   const isTokenPresent = !!token;
    useEffect(() => {
        const checkUserVote = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/Vote/HasVoted`, {
                    params: { ImageId: imageId, UserId: userId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                })
                setIsVote(response.data);
            } catch (e) {
                console.error("there was an error");
            }
        }
        checkUserVote();
    }, [token])
    const clickAddVote = () => {
        dispatch(addVote({ userId, imageId, challengeId }))
        setIsVote(false)
        console.log(isVote+"kkkkkkkkkkkk");
        
    }
    const clickDeleteVote = () => {
        dispatch(deleteVote({ userId, imageId, challengeId }))
        setIsVote(true)
        console.log(isVote+"kkkkkkkkkkkk");
    }
    const isChallengeActive = challenge?.status ? true : false;
    console.log(isChallengeActive);
    console.log(challenge);


    return (<>
        <IconButton
            onClick={clickAddVote}
            sx={{ color: "purple", opacity: isVote ? 1 : 0.5 }}
            // disabled={!isVote}
            disabled={!isVote || !isChallengeActive || !token}
        >
            <AddIcon />
        </IconButton>
        <IconButton
            onClick={clickDeleteVote}
            sx={{ color: "purple", opacity: isVote ? 0.5 : 1 }}
            // disabled={isVote}
            disabled={isVote || !isChallengeActive || !token}
        >
            <HorizontalRuleIcon />
        </IconButton>
        {/* <Box></Box> */}
        {/* {isVote ? (
                <IconButton onClick={clickAddVote} sx={{color:"purple"}}>
                    <AddIcon />
                </IconButton>
            ) : (
                <IconButton onClick={clickDeleteVote} sx={{color:"purple"}} >
                    <HorizontalRuleIcon />
                </IconButton>
            )}
            <Box></Box> */}
    </>)
}
export default Vote

{/* {isVote&&
<Button onClick={clickAddVote}>☝️</Button>
}
<Box></Box>
{!isVote&&
<Button onClick={clickDeleteVote}>👇</Button>
} */}