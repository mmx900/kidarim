import {Container, IconButton, List, ListItem} from "@mui/material";
import {Add} from "@mui/icons-material";
import {getHomeList} from "../../libs/home_manager";

export default function Index() {
    const list = getHomeList().map((what) => {
        <ListItem>{what}</ListItem>
    });

    return <Container maxWidth="xs">
        <List>
            {list}
            <ListItem>
                <IconButton>
                    <Add/>
                </IconButton>
                검색 결과를 바탕으로 홈 화면을 구성할 수 있습니다.
            </ListItem>
        </List>
    </Container>
}
