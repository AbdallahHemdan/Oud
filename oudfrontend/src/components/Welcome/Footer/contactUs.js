import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import LogoOud from './../../../assets/images/logo2.png';
import Hemdan from './../../../assets/images/Hemdan.jpg';
import Ashraf from './../../../assets/images/Ashraf.jpg';
import Mahbob from './../../../assets/images/mahbob.jpg';
import Sedo from './../../../assets/images/sedo.png';
import Waled from './../../../assets/images/waled.jpg';
import './../welcome.css';
class ContactUs extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container HelpSection">
          <img src={LogoOud} alt="" className="HelpLogo container" />
          <div className="Help_text">
            <h1>Contact with us</h1>
            <h2>Thanks goes to these wonderful people in the frontend team.</h2>
          </div>
          <div class="grid-container">
            <div class="item1">
              <div className="">
                <img src={Hemdan} className="ContactImage" alt="" />
                <h6>Abdallah Hemdan</h6>
                <a href="https://www.facebook.com/profile.php?id=100009270028400">
                  <i class="fab fa-facebook"></i>
                </a>
                <> </>
                <a href="https://github.com/AbdallahHemdan">
                  <i class="fab fa-github"></i>
                </a>
                <> </>
                <a href="https://www.linkedin.com/in/abdallah-a-hemdan-4a94a614a/">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div class="item2">
              <div className="">
                <img src={Sedo} className="ContactImage" alt="" />
                <h6>Abdallah Abu Sedo</h6>
                <a href="https://www.facebook.com/abdallah.abusedo">
                  <i class="fab fa-facebook"></i>
                </a>
                <> </>
                <a href="https://github.com/abdallahabusedo">
                  <i class="fab fa-github"></i>
                </a>
                <> </>
                <a href="https://www.linkedin.com/in/abdallah-abu-sedo-63958a185/">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div class="item3">
              <div className="">
                <img src={Waled} className="ContactImage" alt="" />
                <h6>Ahmed Walid</h6>
                <a href="https://www.facebook.com/profile.php?id=100007752348014">
                  <i class="fab fa-facebook"></i>
                </a>
                <> </>
                <a href="https://github.com/lido22">
                  <i class="fab fa-github"></i>
                </a>
                <> </>
                <a href="https://www.linkedin.com/in/abdallah-a-hemdan-4a94a614a/">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div class="item4">
              <div className="">
                <img src={Mahbob} className="ContactImage" alt="" />
                <h6>Ahmed Mahboub </h6>
                <a href="https://www.facebook.com/ahmed.mahboub99">
                  <i class="fab fa-facebook"></i>
                </a>
                <> </>
                <a href="https://github.com/Mahboub99">
                  <i class="fab fa-github"></i>
                </a>
                <> </>
                <a href="https://www.linkedin.com/in/ahmed-mahboub-a6607a171/">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div class="item5">
              <div className="">
                <img src={Ashraf} className="ContactImage" alt="" />
                <h6>Ahmed Ashraf</h6>
                <a href="https://www.facebook.com/aashrafh">
                  <i class="fab fa-facebook"></i>
                </a>
                <> </>
                <a href="https://github.com/aashrafh?fbclid=IwAR1wU3l6KmMtBYdMGQGEi1PvSFH68xOlgntLIs-_FjaStAgrAqq_rT_318k">
                  <i class="fab fa-github"></i>
                </a>
                <> </>
                <a href="https://www.linkedin.com/in/aashrafh/?fbclid=IwAR3cpLFGfeZ_CuPy21cE95pJZ9xc80CJgIEDyZSAhIYL0h-vi0PP9IUTzpk">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;