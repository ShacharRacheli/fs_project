import { IconButton } from "@mui/material"
import { getUserIdByToken } from "../store/getFromToken"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addVote, deleteVote } from "../redux/imageSlice";
import { useEffect, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const Vote = ({ imageId, challengeId }: { imageId: number, challengeId: number }) => {
    const userId = getUserIdByToken();
    const dispatch = useDispatch<AppDispatch>();
    useSelector((state: RootState) => state.images.imagesByChallenge);
    const challenge = useSelector((state: RootState) => state.challenges.selectedChallenge);
    const [hasVoted, setHasVoted] = useState<boolean>();
    const [token, _] = useState<string | null>(sessionStorage.getItem('token'))
    useEffect(() => {
        const checkUserVote = async () => {
            if (token) {
                try {
                    console.log(imageId + "dsss" + userId);
                    const response = await axios.get(`${apiUrl}/api/Vote/HasVoted`,
                        {
                            params: { imageId: imageId, userId: userId },
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            }
                        });
                    setHasVoted(response.data);
                    console.log("Vote status:", response.data, "userid", userId, "imageid", imageId);
                } catch (e) {
                    console.error("there was an error");
                }
            }
        }
        checkUserVote();
    }, [token, userId, imageId])
    const handleAddVote = () => {

        dispatch(addVote({ userId, imageId, challengeId }))
        setHasVoted(true)
    }
    const handleRemoveVote = () => {
        dispatch(deleteVote({ userId, imageId, challengeId }))
        setHasVoted(false)
    }
    const isChallengeActive = challenge?.status ? true : false;

    return (<>
        <IconButton
            onClick={handleAddVote}
            sx={{ color: "purple", opacity: hasVoted ? 0.5 : 1 }}
            disabled={hasVoted || !isChallengeActive || !token}
        >
            <AddIcon />
        </IconButton>
        <IconButton
            onClick={handleRemoveVote}
            sx={{ color: "purple", opacity: hasVoted ? 1 : 0.5 }}
            disabled={!hasVoted || !isChallengeActive || !token}
        >
            <HorizontalRuleIcon />
        </IconButton>      
    </>)
}
export default Vote
