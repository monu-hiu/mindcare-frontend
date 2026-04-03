import "./footer.css";
import { Link } from "react-router-dom";

import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer(){

return(

<footer className="footer">

<div className="footerContainer">

<div className="footerBrand">

<h2>🧠 MindCare</h2>

<p>
Supporting emotional wellbeing through reflection,
awareness and mindful habits.
</p>

</div>

<div className="footerLinks">

<h4>Explore</h4>

<Link to="/dashboard">Dashboard</Link>
<Link to="/mindfulness">Mindfulness</Link>
<Link to="/goal">Goals</Link>
<Link to="/suggestions">Resources</Link>
<Link to="/support">Support</Link>

</div>

<div className="footerContact">

<h4>Contact</h4>

<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=supportmindcare@gmail.com&su=Support%20Request"
  target="_blank"
  rel="noopener noreferrer"
>
 supportmindcare@gmail.com
</a>

<p>Help Center</p>

</div>
<div className="footerHelp">

<h4>Help Center</h4>

<Link to="/faq">FAQ</Link>

<Link to="/support">Support Center</Link>

<a
href="https://findahelpline.com/"
target="_blank"
rel="noreferrer"
>
Emergency Support
</a>

<Link to="/privacy-policy">Privacy Policy</Link>

<Link to="/feedback">Give Feedback</Link>

</div>


<div className="footerSocial">

<h4>Follow Us</h4>

<div className="socialIcons">

<a href="#">
<FaLinkedin />
</a>

<a href="https://twitter.com/@care_mind36420"
  target="_blank"
  rel="noopener noreferrer">
<FaTwitter />
</a>

<a href="https://instagram.com/mindcare162"
  target="_blank"
  rel="noopener noreferrer">
<FaInstagram />
</a>

<a href="#">
<FaGithub />
</a>

</div>

</div>

</div>

<p className="footerNote">

This platform supports emotional wellbeing and self-care.
It does not replace professional mental health treatment.

</p>

<p className="copyright">
© 2026 MindCare. All rights reserved.
</p>

</footer>

)

}

export default Footer;



