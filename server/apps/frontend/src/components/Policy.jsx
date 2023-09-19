export default function Policy({ lang }) {
    if (lang == 'th')
        return (
            <>
                <h1 className="font-medium text-lg">นโยบายความเป็นส่วนตัวสำหรับลูกค้า</h1>
                <p>faceprove ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของคุณ โดยนโยบายความเป็นส่วนตัวฉบับนี้ได้อธิบายแนวปฏิบัติเกี่ยวกับการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล รวมถึงสิทธิต่าง ๆ ของเจ้าของข้อมูลส่วนบุคคล ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล</p>

                <h2 className="font-medium text-[16px]">การเก็บรวบรวมข้อมูลส่วนบุคคล</h2>
                <p>
                    เราจะเก็บรวบรวมข้อมูลส่วนบุคคลที่ได้รับโดยตรงจากคุณผ่านช่องทาง ดังต่อไปนี้
                </p>
                <ul>
                    <li className="ml-2">- การสมัครสมาชิก</li>
                    <li className="ml-2">- โทรศัพท์</li>
                    <li className="ml-2">- อีเมล</li>
                    <li className="ml-2">- Facebook Login</li>
                    <li className="ml-2">- Google Login</li>
                </ul>
                <p></p>

                <h2 className="font-medium text-[16px]">ประเภทข้อมูลส่วนบุคคลที่เก็บรวบรวม</h2>
                <p><b>ข้อมูลส่วนบุคคล</b> เช่น ชื่อ นามสกุล อายุ วันเดือนปีเกิด สัญชาติ เลขประจำตัวประชาชน หนังสือเดินทาง เป็นต้น</p>
                <p><b>ข้อมูลการติดต่อ</b> เช่น ที่อยู่ หมายเลขโทรศัพท์ อีเมล เป็นต้น</p>
                <p><b>ข้อมูลบัญชี</b> เช่น บัญชีผู้ใช้งาน ประวัติการใช้งาน เป็นต้น</p>
                <p><b>หลักฐานแสดงตัวตน</b> เช่น สำเนาบัตรประจำตัวประชาชน สำเนาหนังสือเดินทาง เป็นต้น</p>
                <p><b>ข้อมูลการทำธุรกรรมและการเงิน</b> เช่น ประวัติการสั่งซื้อ รายละเอียดบัตรเครดิต บัญชีธนาคาร เป็นต้น</p>
                <p><b>ข้อมูลทางเทคนิค</b> เช่น IP address, Cookie ID, ประวัติการใช้งานเว็บไซต์ (Activity Log) เป็นต้น</p>
                <p><b>ข้อมูลอื่น ๆ</b> เช่น รูปภาพ ภาพเคลื่อนไหว และข้อมูลอื่นใดที่ถือว่าเป็นข้อมูลส่วนบุคคลตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล</p>

                <h2 className="font-medium text-[16px]">ผู้เยาว์</h2>
                <p>หากคุณมีอายุต่ำกว่า 20 ปีหรือมีข้อจำกัดความสามารถตามกฎหมาย เราอาจเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของคุณ เราอาจจำเป็นต้องให้พ่อแม่หรือผู้ปกครองของคุณให้ความยินยอมหรือที่กฎหมายอนุญาตให้ทำได้ หากเราทราบว่ามีการเก็บรวบรวมข้อมูลส่วนบุคคลจากผู้เยาว์โดยไม่ได้รับความยินยอมจากพ่อแม่หรือผู้ปกครอง เราจะดำเนินการลบข้อมูลนั้นออกจากเซิร์ฟเวอร์ของเรา</p>

                <h2 className="font-medium text-[16px]">วิธีการเก็บรักษาข้อมูลส่วนบุคคล</h2>
                <p>เราจะเก็บรักษาข้อมูลส่วนบุคคลของคุณในรูปแบบเอกสารและรูปแบบอิเล็กทรอนิกส์</p>
                <p>เราเก็บรักษาข้อมูลส่วนบุคคลของคุณ ดังต่อไปนี้</p>
                <ul>
                    <li>เซิร์ฟเวอร์บริษัทของเราในประเทศไทย</li>
                    <li>ผู้ให้บริการเซิร์ฟเวอร์ในต่างประเทศ</li>
                </ul>

                <h2 className="font-medium text-[16px]">การประมวลผลข้อมูลส่วนบุคคล</h2>
                <p>เราจะเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของคุณเพื่อวัตถุประสงค์ดังต่อไปนี้</p>
                <ul>
                    <li>เพื่อสร้างและจัดการบัญชีผู้ใช้งาน</li>
                    <li>เพื่อการบริหารจัดการภายในบริษัท</li>
                    <li>เพื่อรวบรวมข้อเสนอแนะ</li>
                    <li>เพื่อปฏิบัติตามข้อตกลงและเงื่อนไข (Terms and Conditions)</li>
                </ul>

                <h2 className="font-medium text-[16px]">การเปิดเผยข้อมูลส่วนบุคคล</h2>
                <p>เราอาจเปิดเผยข้อมูลส่วนบุคคลของคุณให้แก่ผู้อื่นภายใต้ความยินยอมของคุณหรือที่กฎหมายอนุญาตให้เปิดเผยได้ ดังต่อไปนี้</p>

                <p><b>การบริหารจัดการภายในองค์กร</b></p>
                <p>เราอาจเปิดเผยข้อมูลส่วนบุคคลของคุณภายในบริษัทเท่าที่จำเป็นเพื่อปรับปรุงและพัฒนาสินค้าหรือบริการของเรา เราอาจรวบรวมข้อมูลภายในสำหรับสินค้าหรือบริการต่าง ๆ ภายใต้นโยบายนี้เพื่อประโยชน์ของคุณและผู้อื่นมากขึ้น</p>

                <p><b>พันธมิตรทางธุรกิจ</b></p>
                <p>เราอาจเปิดเผยข้อมูลบางอย่างกับพันธมิตรทางธุรกิจเพื่อติดต่อและประสานงานในการให้บริการสินค้าหรือบริการ และให้ข้อมูลเท่าที่จำเป็นเกี่ยวกับความพร้อมใช้งานของสินค้าหรือบริการ</p>

                <h2 className="font-medium text-[16px]">ระยะเวลาจัดเก็บข้อมูลส่วนบุคคล</h2>
                <p>เราจะเก็บรักษาข้อมูลส่วนบุคคลของคุณไว้ตามระยะเวลาที่จำเป็นในระหว่างที่คุณเป็นลูกค้าหรือมีความสัมพันธ์อยู่กับเราหรือตลอดระยะเวลาที่จำเป็นเพื่อให้บรรลุวัตถุประสงค์ที่เกี่ยวข้องกับนโยบายฉบับนี้ ซึ่งอาจจำเป็นต้องเก็บรักษาไว้ต่อไปภายหลังจากนั้น หากมีกฎหมายกำหนดไว้ เราจะลบ ทำลาย หรือทำให้เป็นข้อมูลที่ไม่สามารถระบุตัวตนของคุณได้ เมื่อหมดความจำเป็นหรือสิ้นสุดระยะเวลาดังกล่าว</p>

                <h2 className="font-medium text-[16px]">สิทธิของเจ้าของข้อมูลส่วนบุคคล</h2>
                <p>ภายใต้กฎหมายคุ้มครองข้อมูลส่วนบุคคล  คุณมีสิทธิในการดำเนินการดังต่อไปนี้</p>

                <p><b>สิทธิขอถอนความยินยอม (right to withdraw consent)</b> หากคุณได้ให้ความยินยอม เราจะเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของคุณ ไม่ว่าจะเป็นความยินยอมที่คุณให้ไว้ก่อนวันที่กฎหมายคุ้มครองข้อมูลส่วนบุคคลใช้บังคับหรือหลังจากนั้น คุณมีสิทธิที่จะถอนความยินยอมเมื่อใดก็ได้ตลอดเวลา</p>

                <p><b>สิทธิขอเข้าถึงข้อมูล (right to access)</b> คุณมีสิทธิขอเข้าถึงข้อมูลส่วนบุคคลของคุณที่อยู่ในความรับผิดชอบของเราและขอให้เราทำสำเนาข้อมูลดังกล่าวให้แก่คุณ  รวมถึงขอให้เราเปิดเผยว่าเราได้ข้อมูลส่วนบุคคลของคุณมาได้อย่างไร</p>

                <p><b>สิทธิขอถ่ายโอนข้อมูล (right to data portability)</b> คุณมีสิทธิขอรับข้อมูลส่วนบุคคลของคุณในกรณีที่เราได้จัดทำข้อมูลส่วนบุคคลนั้นอยู่ในรูปแบบให้สามารถอ่านหรือใช้งานได้ด้วยเครื่องมือหรืออุปกรณ์ที่ทำงานได้โดยอัตโนมัติและสามารถใช้หรือเปิดเผยข้อมูลส่วนบุคคลได้ด้วยวิธีการอัตโนมัติ รวมทั้งมีสิทธิขอให้เราส่งหรือโอนข้อมูลส่วนบุคคลในรูปแบบดังกล่าวไปยังผู้ควบคุมข้อมูลส่วนบุคคลอื่นเมื่อสามารถทำได้ด้วยวิธีการอัตโนมัติ และมีสิทธิขอรับข้อมูลส่วนบุคคลที่เราส่งหรือโอนข้อมูลส่วนบุคคลในรูปแบบดังกล่าวไปยังผู้ควบคุมข้อมูลส่วนบุคคลอื่นโดยตรง เว้นแต่ไม่สามารถดำเนินการได้เพราะเหตุทางเทคนิค</p>

                <p><b>สิทธิขอคัดค้าน (right to object)</b>  คุณมีสิทธิขอคัดค้านการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของคุณในเวลาใดก็ได้ หากการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของคุณที่ทำขึ้นเพื่อการดำเนินงานที่จำเป็นภายใต้ประโยชน์โดยชอบด้วยกฎหมายของเราหรือของบุคคลหรือนิติบุคคลอื่น โดยไม่เกินขอบเขตที่คุณสามารถคาดหมายได้อย่างสมเหตุสมผลหรือเพื่อดำเนินการตามภารกิจเพื่อสาธารณประโยชน์</p>

                <p><b>สิทธิขอให้ลบหรือทำลายข้อมูล (right to erasure/destruction)</b> คุณมีสิทธิขอลบหรือทำลายข้อมูลส่วนบุคคลของคุณหรือทำให้ข้อมูลส่วนบุคคลเป็นข้อมูลที่ไม่สามารถระบุตัวคุณได้ หากคุณเชื่อว่าข้อมูลส่วนบุคคลของคุณถูกเก็บรวบรวม ใช้ หรือเปิดเผยโดยไม่ชอบด้วยกฎหมายที่เกี่ยวข้องหรือเห็นว่าเราหมดความจำเป็นในการเก็บรักษาไว้ตามวัตถุประสงค์ที่เกี่ยวข้องในนโยบายฉบับนี้ หรือเมื่อคุณได้ใช้สิทธิขอถอนความยินยอมหรือใช้สิทธิขอคัดค้านตามที่แจ้งไว้ข้างต้นแล้ว</p>

                <p><b>สิทธิขอให้ระงับการใช้ข้อมูล (right to restriction of processing)</b> คุณมีสิทธิขอให้ระงับการใช้ข้อมูลส่วนบุคคลชั่วคราวในกรณีที่เราอยู่ระหว่างตรวจสอบตามคำร้องขอใช้สิทธิขอแก้ไขข้อมูลส่วนบุคคลหรือขอคัดค้านของคุณหรือกรณีอื่นใดที่เราหมดความจำเป็นและต้องลบหรือทำลายข้อมูลส่วนบุคคลของคุณตามกฎหมายที่เกี่ยวข้องแต่คุณขอให้เราระงับการใช้แทน</p>

                <p><b>สิทธิขอให้แก้ไขข้อมูล (right to rectification)</b> คุณมีสิทธิขอแก้ไขข้อมูลส่วนบุคคลของคุณให้ถูกต้อง เป็นปัจจุบัน สมบูรณ์ และไม่ก่อให้เกิดความเข้าใจผิด</p>

                <p><b>สิทธิร้องเรียน (right to lodge a complaint)</b> คุณมีสิทธิร้องเรียนต่อผู้มีอำนาจตามกฎหมายที่เกี่ยวข้อง หากคุณเชื่อว่าการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของคุณ เป็นการกระทำในลักษณะที่ฝ่าฝืนหรือไม่ปฏิบัติตามกฎหมายที่เกี่ยวข้อง</p>


                <p>คุณสามารถใช้สิทธิของคุณในฐานะเจ้าของข้อมูลส่วนบุคคลข้างต้นได้ โดยติดต่อมาที่เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลของเราตามรายละเอียดท้ายนโยบายนี้ เราจะแจ้งผลการดำเนินการภายในระยะเวลา 30 วัน นับแต่วันที่เราได้รับคำขอใช้สิทธิจากคุณ ตามแบบฟอร์มหรือวิธีการที่เรากำหนด ทั้งนี้ หากเราปฏิเสธคำขอเราจะแจ้งเหตุผลของการปฏิเสธให้คุณทราบผ่านช่องทางต่าง ๆ เช่น ข้อความ (SMS) อีเมล โทรศัพท์ จดหมาย เป็นต้น</p>


                <h2 className="font-medium text-[16px]">เทคโนโลยีติดตามตัวบุคคล (Cookies)</h2>
                <p>เพื่อเพิ่มประสบการณ์การใช้งานของคุณให้สมบูรณ์และมีประสิทธิภาพมากขึ้น เราใช้คุกกี้ (Cookies)หรือเทคโนโลยีที่คล้ายคลึงกัน เพื่อพัฒนาการเข้าถึงสินค้าหรือบริการ โฆษณาที่เหมาะสม และติดตามการใช้งานของคุณ เราใช้คุกกี้เพื่อระบุและติดตามผู้ใช้งานเว็บไซต์และการเข้าถึงเว็บไซต์ของเรา หากคุณไม่ต้องการให้มีคุกกี้ไว้ในคอมพิวเตอร์ของคุณ คุณสามารถตั้งค่าบราวเซอร์เพื่อปฏิเสธคุกกี้ก่อนที่จะใช้เว็บไซต์ของเราได้</p>

                <h2 className="font-medium text-[16px]">การรักษาความมั่งคงปลอดภัยของข้อมูลส่วนบุคคล</h2>
                <p>เราจะรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลของคุณไว้ตามหลักการ การรักษาความลับ (confidentiality) ความถูกต้องครบถ้วน (integrity) และสภาพพร้อมใช้งาน (availability) ทั้งนี้ เพื่อป้องกันการสูญหาย เข้าถึง ใช้ เปลี่ยนแปลง แก้ไข หรือเปิดเผย นอกจากนี้เราจะจัดให้มีมาตรการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคล ซึ่งครอบคลุมถึงมาตรการป้องกันด้านการบริหารจัดการ (administrative safeguard) มาตรการป้องกันด้านเทคนิค (technical safeguard) และมาตรการป้องกันทางกายภาพ (physical safeguard) ในเรื่องการเข้าถึงหรือควบคุมการใช้งานข้อมูลส่วนบุคคล (access control)</p>

                <h2 className="font-medium text-[16px]">การแจ้งเหตุละเมิดข้อมูลส่วนบุคคล</h2>
                <p>ในกรณีที่มีเหตุละเมิดข้อมูลส่วนบุคคลของคุณเกิดขึ้น เราจะแจ้งให้สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคลทราบโดยไม่ชักช้าภายใน 72 ชั่วโมง นับแต่ทราบเหตุเท่าที่สามารถกระทำได้ ในกรณีที่การละเมิดมีความเสี่ยงสูงที่จะมีผลกระทบต่อสิทธิและเสรีภาพของคุณ เราจะแจ้งการละเมิดให้คุณทราบพร้อมกับแนวทางการเยียวยาโดยไม่ชักช้าผ่านช่องทางต่าง ๆ เช่น  เว็บไซต์ ข้อความ (SMS) อีเมล โทรศัพท์ จดหมาย เป็นต้น</p>

                <h2 className="font-medium text-[16px]">การแก้ไขเปลี่ยนแปลงนโยบายความเป็นส่วนตัว</h2>
                <p>เราอาจแก้ไขเปลี่ยนแปลงนโยบายนี้เป็นครั้งคราว โดยคุณสามารถทราบข้อกำหนดและเงื่อนไขนโยบายที่มีการแก้ไขเปลี่ยนแปลงนี้ได้ผ่านทางเว็บไซต์ของเรา</p>
                <p>นโยบายนี้แก้ไขล่าสุดและมีผลใช้บังคับตั้งแต่วันที่ 19 กันยายน 2566</p>

                <h2 className="font-medium text-[16px]">นโยบายความเป็นส่วนตัวของเว็บไซต์อื่น</h2>
                <p>นโยบายความเป็นส่วนตัวฉบับนี้ใช้สำหรับการเสนอสินค้า บริการ และการใช้งานบนเว็บไซต์สำหรับลูกค้าของเราเท่านั้น หากคุณเข้าชมเว็บไซต์อื่นแม้จะผ่านช่องทางเว็บไซต์ของเรา การคุ้มครองข้อมูลส่วนบุคคลต่าง ๆ จะเป็นไปตามนโยบายความเป็นส่วนตัวของเว็บไซต์นั้น ซึ่งเราไม่มีส่วนเกี่ยวข้องด้วย</p>
            </>
        )
    if(lang == 'en')
    return (
        <>
            <h1 className="font-medium text-lg">Privacy Policy for Customer</h1>
            <p>faceprove recognizes the importance of the protection of your personal data. This Privacy Policy explains our practices regarding the collection, use or disclosure of personal data including other rights of the Data Subjects in accordance with the Personal Data Protection Laws.</p>

            <h2 className="font-medium text-[16px]">Collection of Personal Data</h2>
            <p>
                We will collect your personal data that receive directly from you as following:
            </p><ul>
                <li>your account registration</li>
                <li>telephone</li>
                <li>email address</li>
                <li>Facebook Login</li>
                <li>Google Login</li>
            </ul>
            <p></p>

            <h2 className="font-medium text-[16px]">Types of Data Collected</h2>
            <p><b>Personal data</b> such as name, surname, age, date of birth, nationality, identification card, passport, etc.</p>
            <p><b>Contact information</b> such as address, telephone number, e-mail address, etc.</p>
            <p><b>Account details</b> such as username, password, transactions history, etc.</p>
            <p><b>Proof of identity</b> such as copy of identification card, copy of passport, etc.</p>
            <p><b>Transaction and Financial information</b> such as purchase history, credit card details, bank account, etc.</p>
            <p><b>Technical data</b> such as IP address, Cookie ID, Activity Log, etc.</p>
            <p><b>Other</b> such as photo, video, and other information that is considered personal data under the Personal Data Protection Laws.</p>

            <h2 className="font-medium text-[16px]" >Children</h2>
            <p>If you are under the age of 20 or having legal restrictions, we may collect use or disclose your personal data. We require your parents or guardian to be aware and provide consent to us or allowed by applicable laws. If we become aware that we have collected personal data from children without verification of parental consent, we take steps to remove that information from our servers.</p>

            <h2 className="font-medium text-[16px]">Storage of Data</h2>
            <p>We store your personal data as hard copy and soft copy.</p>
            <p>We store your personal data by using the following systems:</p>
            <ul>
                <li>Our server in Thailand</li>
                <li>Third-party server service providers outside of Thailand</li>
            </ul>

            <h2 className="font-medium text-[16px]">Use of Data</h2>
            <p>We use the collected data for various purposes:</p>
            <ul>
                <li>To create and manage accounts</li>
                <li>To share and manage information within organization</li>
                <li>To gather user’s feedback</li>
                <li>To comply with our Terms and Conditions</li>
            </ul>

            <h2 className="font-medium text-[16px]">Disclosure of Personal Data</h2>
            <p>We may disclose your personal data to the following parties in certain circumstances:</p>

            <p><b>Organization</b></p>
            <p>We may disclose your personal data within our organization to provide and develop our products or services. We may combine information internally across the different products or services covered by this Privacy Policy to help us be more relevant and useful to you and others.</p>

            <p><b>Business Partners</b></p>
            <p>In relation with our business partners, we may disclose certain personal data to them in order to coordinate and provide our products or services to you and provide necessary information about the availability of our products or services.</p>

            <h2>Data Retention</h2>
            <p>We will retain your personal data for as long as necessary during the period you are a customer or under relationship with us, or for as long as necessary in connection with the purposes set out in this Privacy Policy, unless law requires or permits a longer retention period. We will erase, destroy or anonymize your personal data when it is no longer necessary or when the period lapses.</p>

            <h2>Data Subject Rights</h2>
            <p>Subject to the Personal Data Protection Laws thereof, you may exercise any of these rights in the following:</p>

            <p><b>Withdrawal of consent</b>: If you have given consent to us to collect, use or disclose your personal data whether before or after the effective date of the Personal Data Protection Laws, you have the right to withdraw such consent at any time throughout the period your personal data available to us, unless it is restricted by laws or you are still under beneficial contract.</p>

            <p><b>Data access</b>: You have the right to access your personal data that is under our responsibility; to request us to make a copy of such data for you; and to request us to reveal as to how we obtain your personal data.</p>

            <p><b>Data portability</b>: You have the right to obtain your personal data if we organize such personal data in automatic machine-readable or usable format and can be processed or disclosed by automatic means; to request us to send or transfer the personal data in such format directly to other data controllers if doable by automatic means; and to request to obtain the personal data in such format sent or transferred by us directly to other data controller unless not technically feasible.</p>

            <p><b>Objection</b>: You have the right to object to collection, use or disclosure of your personal data at any time if such doing is conducted for legitimate interests of us, corporation or individual which is within your reasonable expectation; or for carrying out public tasks.</p>

            <p><b>Data erasure or destruction</b>: You have the right to request us to erase, destroy or anonymize your personal data if you believe that the collection, use or disclosure of your personal data is against relevant laws; or retention of the data by us is no longer necessary in connection with related purposes under this Privacy Policy; or when you request to withdraw your consent or to object to the processing as earlier described.</p>

            <p><b>Suspension</b>: You have the right to request us to suspend processing your personal data during the period where we examine your rectification or objection request; or when it is no longer necessary and we must erase or destroy your personal data pursuant to relevant laws but you instead request us to suspend the processing.</p>

            <p><b>Rectification</b>: You have the right to rectify your personal data to be updated, complete and not misleading.</p>

            <p><b>Complaint lodging</b>: You have the right to complain to competent authorities pursuant to relevant laws if you believe that the collection, use or disclosure of your personal data is violating or not in compliance with relevant laws.</p>


            <p>You can exercise these rights as the Data Subject by contacting our Data Protection Officer as mentioned below. We will notify the result of your request within 30 days upon receipt of such request. If we deny the request, we will inform you of the reason via SMS, email address, telephone, registered mail (if applicable).</p>


            <h2 className="font-medium text-[16px]">Cookies</h2>
            <p>To enrich and perfect your experience, we use cookies or similar technologies to display personalized content, appropriate advertising and store your preferences on your computer. We use cookies to identify and track visitors, their usage of our website and their website access preferences. If you do not wish to have cookies placed on your computer you should set their browsers to refuse cookies before using our website.</p>

            <h2 className="font-medium text-[16px]">Data Security</h2>
            <p>We endeavor to protect your personal data by establishing security measures in accordance with the principles of confidentiality, integrity, and availability to prevent loss, unauthorized or unlawful access, destruction, use, alteration, or disclosure including administrative safeguard, technical safeguard, physical safeguard and access controls.</p>

            <h2 className="font-medium text-[16px]">Data Breach Notification</h2>
            <p>We will notify the Office of the Personal Data Protection Committee without delay and, where feasible, within 72 hours after having become aware of it, unless such personal data breach is unlikely to result in a risk to the rights and freedoms of you. If the personal data breach is likely to result in a high risk to the rights and freedoms of you, we will also notify the personal data breach and the remedial measures to you without delay through our website, SMS, email address, telephone or registered mail (if applicable).</p>

            <h2 className="font-medium text-[16px]">Changes to this Privacy Policy</h2>
            <p>We may change this Privacy Policy from time to time. Any changes of this Privacy Policy, we encourage you to frequently check on our website.</p>
            <p>This Privacy Policy was last updated and effective on 19th September 2023</p>

            <h2 className="font-medium text-[16px]">Links to Other Sites</h2>
            <p>The purpose of this Privacy Policy is to offer products or services and use of our website. Any websites from other domains found on our site is subject to their privacy policy which is not related to us.</p>
        </>
    )
}