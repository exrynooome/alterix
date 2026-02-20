import Main from "@/app/_sections/Main";
import Container from "@/components/Container";
import Services from "@/app/_sections/Services";
import Stages from "@/app/_sections/Stages";
import Projects from "@/app/_sections/Projects";
import Technologies from "@/app/_sections/Technologies";
import BgColor from "@/components/BgColor";
import Order from "@/app/_sections/Order";
import Contacts from "@/app/_sections/Contacts";

export default function Home() {

    // sections: main, services, stages, projects, order, contacts
  return (
    <div>
        <Main />
        <Container>
            <Services />
            <BgColor color={"blue"} position={"above"} />
            <Stages />
            <Projects />
            <Technologies />
            <BgColor color={"purple"} position={"above"} />
            <Order />
            <Contacts />
            <BgColor color={"darkBlue"} position={"above"} size={"small"} />
        </Container>
    </div>
  );
}
