import Icon from "./Icon";
import "./footer.scss";

export default () => {
    return (
        <footer class="footer">
            <div class="footer__col">
                <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_627_616)">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.420532 0H6.45792V20.2723C9.40288 18.4576 13.2365 17.5403 17.7383 17.5403C22.0663 17.5403 24.5508 16.4996 25.9915 15.0411C27.4418 13.5728 28.3831 11.1272 28.3831 7.11093V0H34.4205V7.11093C34.4205 11.9439 33.2964 16.2141 30.2982 19.2494C27.2902 22.2945 22.943 23.5451 17.7383 23.5451C13.4126 23.5451 10.576 24.5697 8.8877 25.8991C7.27268 27.1708 6.45792 28.9076 6.45792 31.0511V40H0.420532V0Z"
                            fill="currentColor"
                        />
                        <mask id="mask0_627_616" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="20" width="28" height="20">
                            <path
                                d="M31.1636 20.1343C27.7435 23.499 22.9789 24.7959 17.5794 24.7959C13.4516 24.7959 10.945 25.7748 9.56709 26.8598C8.29498 27.8615 7.64954 29.2004 7.64954 30.9587V40.0002H34.3411V20.1016L31.1636 20.1343Z"
                                fill="black"
                            />
                        </mask>
                        <g mask="url(#mask0_627_616)">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M18.5535 30.5588C17.1074 29.3117 15.5104 27.0535 15.4346 24.414L21.472 24.335C21.4756 24.4608 21.5269 25.1753 22.5087 26.022C23.297 26.7019 24.2705 27.3292 25.4922 28.1166C25.8429 28.3427 26.2142 28.582 26.6074 28.8395C29.6731 30.847 34.3411 34.1043 34.3411 39.9998H28.3037C28.3037 37.6781 26.6166 36.0349 23.2874 33.8548C23.0113 33.674 22.7185 33.4858 22.4155 33.2912C21.1443 32.4744 19.6947 31.543 18.5535 30.5588Z"
                                fill="currentColor"
                                style="opacity: 0.6;"
                            />
                        </g>
                    </g>
                    <defs>
                        <clipPath id="clip0_627_616">
                            <rect width="34" height="40" fill="white" transform="translate(0.5)" />
                        </clipPath>
                    </defs>
                </svg>
                <div class="footer__col__item">Copyright © Rela 2023.</div>
            </div>
            <div class="footer__col">
                <div class="footer__col__header">Product</div>
                <a href="/download" class="footer__col__item">
                    Download
                </a>
                <a href="/docs" class="footer__col__item">
                    API Docs
                </a>
                <a href="/redirect/github" target="_blank" class="footer__col__item">
                    GitHub <Icon name="link-external" />
                </a>
            </div>
            <div class="footer__col">
                <div class="footer__col__header">Company</div>
                <a href="https://rela.dev/mission" class="footer__col__item">
                    Mission
                </a>
                <a href="https://rela.dev/oss" class="footer__col__item">
                    Open Source
                </a>
                <a href="/press" download target="_blank" class="footer__col__item">
                    Press Kit
                    <Icon name="link-external" />
                </a>
                <a href="https://rela.dev" target="_blank" class="footer__col__item">
                    Website
                    <Icon name="link-external" />
                </a>
            </div>
            <div class="footer__col">
                <div class="footer__col__header">Social</div>
                <a href="/" target="_blank" class="footer__col__item">
                    Product Hunt
                    <Icon name="link-external" />
                </a>
                <a href="/" target="_blank" class="footer__col__item">
                    Dribble
                    <Icon name="link-external" />
                </a>
                <a href="/" target="_blank" class="footer__col__item">
                    Figma
                    <Icon name="link-external" />
                </a>
            </div>
        </footer>
    );
};
