import React from "react";
import {Helmet} from "react-helmet";

const TuTiempo = () => {
  //        <!-- www.tutiempo.net - Ancho:477px - Alto:122px -->
    return(
        <div>
            <div id="TT_yiJArBthtddQC8IAKfzjjzDDz6aATEIFLtkt1ci5aEz5353o3">El tiempo - Tutiempo.net</div>
            <Helmet>
                <script type="text/javascript" src="https://www.tutiempo.net/s-widget/l_yiJArBthtddQC8IAKfzjjzDDz6aATEIFLtkt1ci5aEz5353o3"></script>
            </Helmet>
        </div>
    );
}
export default TuTiempo;