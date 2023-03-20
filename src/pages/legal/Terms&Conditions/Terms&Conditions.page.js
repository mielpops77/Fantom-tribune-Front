import NavigationUserComponent from '../../../components/Navigation/NavigationUser/NavigationUser.component';
import FooterComponent from '../../../components/Navigation/Footer/Footer.component';
import style from './Terms&Conditions.page.module.scss';
import React from 'react';

const TermsAndCondition = () => {

    return (
        <div className={style.termsAndCondition_fond}>
            <NavigationUserComponent />
            <div className={style.termsAndCondition_container}>
                <h1 className={style.title}>Terms and conditions Fantom Tribune</h1>
                <h2 className={style.subtitle}>Introduction</h2>
                <p>
                    Fantom Tribune is a website that allows its users to list Fantom blockchain tokens.
                    Thank you for visiting our website and for your interest in our services.
                </p>
                <p>
                    These terms and conditions govern your use of our website. By using our website, you accept these terms and conditions in full. If you do not agree to these terms and conditions or any part of them, you must not use our website.
                </p>
                <p>
                    Please read these terms and conditions carefully before using our website. If you have any questions or concerns regarding these terms and conditions, please do not hesitate to contact us by e-mail at the following address: fantomtribune@gmail.com.
                </p>
                <h2 className={style.subtitle}>Proposed services</h2>
                <p>
                    Fantom Tribune is a website that allows its users to list Fantom blockchain tokens. Anyone can submit a token which will then be listed on the site. A listed token can be presale or not. It is also possible to pay in crypto in order to put your token in the "promoted" section.
                </p>

                <p>
                    Please note that Fantom Tribune does not verify submitted tokens and therefore it is possible that there are scams. We therefore recommend that you do your own research before investing in a project listed on our site.
                </p>

                <h2 className={style.subtitle}>Content of the website
                </h2>
                <p>
                    The content of this website is provided for general information only. We strive to keep the information current and accurate, but we cannot guarantee that all information is current and accurate. We are not responsible for any errors or omissions in the content of this website.
                </p>
                <h2 className={style.subtitle}>Use of our website</h2>

                <p>By using our website, you agree not to use our website for any purpose that is unlawful or prohibited by these terms and conditions. You also agree not to use our website in any way that could damage, disable, overburden or harm our website or any other user.</p>
                <p>You agree not to attempt to gain unauthorized access to our website or any system or network connected to our website.</p>
                <p>We reserve the right to restrict access to our website or parts of it at our sole discretion, and we will not be liable if for any reason all or any part of our website is not is not available at any time or for any period.</p>

                <h2 className={style.subtitle}>Intellectual property rights</h2>
                <p>All intellectual property rights in our website and its content (including but not limited to text, images, graphics and logos) are owned by Fantom Tribune or our licensors.</p>
                <p>No part of this website may be reproduced, distributed or transmitted in any form or by any means without our prior written permission.</p>

                <h2 className={style.subtitle}>Links to Third-Party Sites</h2>
                <p>Our website may contain links to third party sites that are not owned or controlled by Fantom Tribune. We have no control over the content, privacy policies or practices of these third-party sites, and we assume no responsibility for them.</p>
                <p>Furthermore, we are not responsible for any viruses or other harmful elements that may be transmitted from these third-party sites. We therefore recommend that you carefully read the terms and conditions and privacy policy of any third-party website you visit.</p>

                <h2 className={style.subtitle}>Questions, remarks and suggestions</h2>
                <p>If you have any questions or suggestions, do not hesitate to contact us by e-mail at the following address: fantomtribune@gmail.com.</p>
                <p>Thank you for your visit and your trust !</p>
            </div>
            <div>
                <FooterComponent />

            </div>

        </div>
    );
};

export default TermsAndCondition;