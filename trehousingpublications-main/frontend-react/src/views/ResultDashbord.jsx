import HeaderSec from "../components/Homepage/HeaderSec";
import FooterSec from "../components/Homepage/FooterSec";
import Performance from "../components/Dashbord/Performance";

import SEO from "../components/SEO";

export default function ResultDashbord() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', color: 'var(--text-dark)' }}>
            <SEO 
                title="My Quiz Performance & Test Analytics Dashboard" 
                description="Track your test score history, subject-wise strengths, mock exam accuracy, and download backup reports."
            />
            <HeaderSec />
            <main style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Performance />
            </main>
            <FooterSec />
        </div>
    );
}