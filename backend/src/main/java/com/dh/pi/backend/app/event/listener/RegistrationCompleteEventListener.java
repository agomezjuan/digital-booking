package com.dh.pi.backend.app.event.listener;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.dh.pi.backend.app.event.RegistrationCompleteEvent;
import com.dh.pi.backend.app.model.User;
import com.dh.pi.backend.app.service.IUserService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {

    @Autowired
    private IUserService userService;

    @Autowired
    private JavaMailSender javaMailSender;

    private User user;

    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        // 1. Get user from event
        user = event.getUser();
        // 2. Generate token
        String token = UUID.randomUUID().toString();
        // 3. Save token
        userService.createVerificationToken(user, token);
        // 4. Generate verification link
        String verificationLink = event.getAppUrl() + "/auth/verify/" + token;
        // 5. Send email
        sendVerificationEmail(user.getName(), user.getEmail(), verificationLink);

        log.info("Verification link: " + verificationLink);

    }

    public void sendVerificationEmail(String name, String email, String verificationLink) {
        String subject = "Por favor, verifique su cuenta";
        String senderName = "Digital Booking System Team";
        // String body = "Para verificar su cuenta, haga click en el siguiente enlace: "
        // + verificationLink;
        String body = "<!doctype html><html lang=en xmlns=http://www.w3.org/1999/xhtml xmlns:o=urn:schemas-microsoft-com:office:office xmlns:v=urn:schemas-microsoft-com:vml><meta charset=utf-8><meta content=\"width=device-width\"name=viewport><meta content=\"IE=edge\"http-equiv=X-UA-Compatible><meta name=x-apple-disable-message-reformatting><title></title><link href=\"https://fonts.googleapis.com/css?family=Lato:300,400,700\"rel=stylesheet><style>body,html{margin:0 auto!important;padding:0!important;height:100%!important;width:100%!important;background:#f1f1f1}*{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}div[style*='margin: 16px 0']{margin:0!important}table,td{mso-table-lspace:0!important;mso-table-rspace:0!important}table{border-spacing:0!important;border-collapse:collapse!important;table-layout:fixed!important;margin:0 auto!important}img{-ms-interpolation-mode:bicubic}a{text-decoration:none}.aBn,.unstyle-auto-detected-links *,[x-apple-data-detectors]{border-bottom:0!important;cursor:default!important;color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}.a6S{display:none!important;opacity:.01!important}.im{color:inherit!important}img.g-img+div{display:none!important}@media only screen and (min-device-width:320px) and (max-device-width:374px){u~div .email-container{min-width:320px!important}}@media only screen and (min-device-width:375px) and (max-device-width:413px){u~div .email-container{min-width:375px!important}}@media only screen and (min-device-width:414px){u~div .email-container{min-width:414px!important}}</style><style>.primary{background:#30e3ca}.bg_white{background:#fff}.bg_light{background:#fafafa}.bg_black{background:#000}.bg_dark{background:rgba(0,0,0,.8)}.email-section{padding:2.5em}.btn{padding:10px 15px;display:inline-block}.btn.btn-primary{border-radius:5px;background:#30e3ca;color:#fff}.btn.btn-white{border-radius:5px;background:#fff;color:#000}.btn.btn-white-outline{border-radius:5px;background:0 0;border:1px solid #fff;color:#fff}.btn.btn-black-outline{border-radius:0;background:0 0;border:2px solid #000;color:#000;font-weight:700}h1,h2,h3,h4,h5,h6{font-family:Lato,sans-serif;color:#000;margin-top:0;font-weight:400}body{font-family:Lato,sans-serif;font-weight:400;font-size:15px;line-height:1.8;color:rgba(0,0,0,.4)}a{color:#30e3ca}.logo h1{margin:0}.logo h1 a{color:#30e3ca;font-size:24px;font-weight:700;font-family:Lato,sans-serif}.hero{position:relative;z-index:0}.hero .text{color:rgba(0,0,0,.3)}.hero .text h2{color:#000;font-size:40px;margin-bottom:0;font-weight:400;line-height:1.4}.hero .text h3{font-size:24px;font-weight:300}.hero .text h2 span{font-weight:600;color:#30e3ca}.heading-section h2{color:#000;font-size:28px;margin-top:0;line-height:1.4;font-weight:400}.heading-section .subheading{margin-bottom:20px!important;display:inline-block;font-size:13px;text-transform:uppercase;letter-spacing:2px;color:rgba(0,0,0,.4);position:relative}.heading-section .subheading::after{position:absolute;left:0;right:0;bottom:-10px;content:'';width:100%;height:2px;background:#30e3ca;margin:0 auto}.heading-section-white{color:rgba(255,255,255,.8)}.heading-section-white h2{line-height:1;padding-bottom:0}.heading-section-white h2{color:#fff}.heading-section-white .subheading{margin-bottom:0;display:inline-block;font-size:13px;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,.4)}ul.social{padding:0}ul.social li{display:inline-block;margin-right:10px}.footer{border-top:1px solid rgba(0,0,0,.05);color:rgba(0,0,0,.5)}.footer .heading{color:#000;font-size:20px}.footer ul{margin:0;padding:0}.footer ul li{list-style:none;margin-bottom:10px}.footer ul li a{color:#000}</style><body style=margin:0;padding:0!important;mso-line-height-rule:exactly;background-color:#f1f1f1 width=100%><center style=width:100%;background-color:#f1f1f1><div style=display:none;font-size:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;font-family:sans-serif></div><div class=email-container style=\"margin:40px auto\"><table class=iN><tr><td class=GQ id=:7b><div id=:78 class=GP style=min-height:472px><div id=:79 class=\"aiL qz\"><div id=:77 class=et><div id=:57 class=ZyRVue><div><table cellpadding=0 class=\"An cf\"id=\"undefined\"><tr><td class=Aq> <td class=Ap><div id=:13j class=\"Ar Au\"style=display:block><div id=:13f class=\"Al Am LW-avf editable tS-tW\"style=direction:ltr;min-height:412px role=textbox tabindex=1 aria-controls=:168 aria-label=\"Cuerpo del mensaje\"aria-multiline=true aria-owns=:168 contenteditable=true g_editable=true hidefocus=true spellcheck=true><div dir=ltr><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse width=100% bgcolor=#051d39 class=m_1307995939901833592em_full_wrap><tr><td style=border-collapse:collapse align=center valign=top><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse;table-layout:fixed class=m_1307995939901833592em_main_table><tr><td style=\"border-collapse:collapse;padding:0 25px\"class=m_1307995939901833592em_aside10 align=center valign=top><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse width=100%><tr><td style=border-collapse:collapse;height:10px class=m_1307995939901833592em_h20 height=10> <tr><td style=border-collapse:collapse align=center valign=top><a href=# style=border-collapse:collapse;text-decoration-line:none target=_blank><img class=\"gmail-CToWUd m_1307995939901833592em_w150\"src=https://bucket-grupo4-assets.s3.amazonaws.com/logo.png alt=\"Digital Booking\" border=0 style=display:block;font-family:Arial,sans-serif;font-size:18px;line-height:25px;color:#1d4685;font-weight:700;max-width:200px;border:0;outline:0 width=120></a><tr><td style=border-collapse:collapse;height:10px class=m_1307995939901833592em_h20 height=10> </table></table></table><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse width=100% bgcolor=#ffffff class=m_1307995939901833592em_full_wrap><tr><td style=border-collapse:collapse class=m_1307995939901833592em_aside5 align=center valign=top><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse;table-layout:fixed class=m_1307995939901833592em_main_table><tr><td style=\"border-collapse:collapse;padding:0 25px\"class=m_1307995939901833592em_aside10 align=center valign=top><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse width=100%><tr><td style=border-collapse:collapse;height:45px class=m_1307995939901833592em_h20 height=45> <tr><td style=border-collapse:collapse;height:14px;font-size:0;line-height:0 height=14> <tr><td style=border-collapse:collapse;height:26px class=m_1307995939901833592em_h20 height=26> <tr><td style=border-collapse:collapse;font-family:Arial,sans-serif;font-size:16px;line-height:26px;color:#666 class=m_1307995939901833592em_grey align=left valign=top><h3 style=color:#051d39>Verificación de correo</h3><p style=margin:0;padding:0>Hola, "
                + name
                + "</p><br><p style=margin:0;padding:0>¡Gracias por elegir Digital Booking! Por favor, confirma tu correo electrónico haciendo click en el enlace de abajo. Así podrás acceder a todas las funcionalidades del sitio, hacer tus reservas de alojamiento y mucho más.</p><br><tr><td style=border-collapse:collapse align=left valign=top><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse;width:275px;background-color:#439b73;border-radius:4px width=275><tr><td style=border-collapse:collapse;font-family:Arial,sans-serif;font-size:16px;color:#fff;font-weight:700;height:42px class=m_1307995939901833592em_white align=center valign=middle height=42><a href=\""
                + verificationLink
                + "\" style=color:#fff;border-collapse:collapse;text-decoration-line:none;line-height:42px;display:block target=_blank>Verifica tu correo electrónico</a></table><br><br><u></u>Si no has realizado el registro para una cuenta de Digital Booking, puedes simplemente ignorar este mensaje.<br><br><p style=margin:0;padding:0>Feliz reserva y disfruta tus vacaciones!</p><br><p style=margin:0;padding:0>El Equipo de Digital Booking<tr><td style=border-collapse:collapse;height:26px class=m_1307995939901833592em_h20 height=26> <tr><td style=border-collapse:collapse align=left valign=top><table cellpadding=0 align=left border=0 cellspacing=0 style=border-collapse:collapse;width:250px;background-color:#439b73;border-radius:4px width=250></table><tr><td style=border-collapse:collapse;height:25px class=m_1307995939901833592em_h20 height=25> <tr><td style=border-collapse:collapse;font-family:Arial,sans-serif;font-size:16px;line-height:26px;color:#666 class=m_1307995939901833592em_grey align=center valign=top><br class=m_1307995939901833592em_hide><tr><td style=border-collapse:collapse;height:44px class=m_1307995939901833592em_h20 height=44> </table></table></table><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse width=100% bgcolor=#f5f8fa class=m_1307995939901833592em_full_wrap><tr><td style=border-collapse:collapse align=center valign=top><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse;table-layout:fixed class=m_1307995939901833592em_main_table><tr><td style=\"border-collapse:collapse;padding:0 25px\"class=m_1307995939901833592em_aside10 align=center valign=top><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse width=100%><tr><td style=border-collapse:collapse;font-size:1px;line-height:1px;height:16px height=16> <tr><td style=border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px;line-height:18px;color:#666;font-weight:700 class=m_1307995939901833592em_grey align=center valign=top>Problemas o preguntas?<tr><td style=border-collapse:collapse;height:10px;font-size:1px;line-height:1px height=10> <tr><td style=border-collapse:collapse;font-size:0;line-height:0 align=center valign=top><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse><tr><td style=border-collapse:collapse;line-height:0;width:15px align=left valign=middle width=15><a href=mailto:help@mailgun.com style=border-collapse:collapse;text-decoration-line:none target=_blank><img class=gmail-CToWUd src=https://app.mailgun.com/assets/pilot/images/templates/email_img.png alt=\"\"border=0 style=display:block;max-width:15px;border:0;outline:0 width=15 height=12></a><td style=border-collapse:collapse;width:9px;line-height:0 class=m_1307995939901833592em_w5 width=9><img class=gmail-CToWUd src=https://app.mailgun.com/assets/pilot/images/templates/spacer.gif alt=\"\"border=0 style=display:block;border:0;outline:0 width=1 height=1><td style=border-collapse:collapse;font-family:Arial,sans-serif;font-size:13px;line-height:15px;color:#666 class=\"m_1307995939901833592em_grey m_1307995939901833592em_font_11\"align=left valign=middle><a href=mailto:digitalbooking@ingenial.co style=color:#666;border-collapse:collapse;text-decoration-line:none target=_blank>digitalbooking@ingenial.co</a></table><tr><td style=border-collapse:collapse;font-size:0;line-height:0;height:9px class=m_1307995939901833592em_h10 height=9><img class=gmail-CToWUd src=https://app.mailgun.com/assets/pilot/images/templates/spacer.gif alt=\"\"border=0 style=display:block;border:0;outline:0 width=1 height=1><tr><td style=border-collapse:collapse align=center valign=top><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse><tr><td style=border-collapse:collapse;font-family:Arial,sans-serif;font-size:13px;line-height:15px;color:#666 class=\"m_1307995939901833592em_grey m_1307995939901833592em_font_11\"align=left valign=middle><a href=https://www.digitalbooking.ingenial.co/ style=color:#666;border-collapse:collapse;text-decoration-line:none target=_blank>www.digitalbooking.ingenial.co</a></table><tr><td style=border-collapse:collapse;height:35px class=m_1307995939901833592em_h20 height=35> </table><tr><td style=border-collapse:collapse;font-size:0;line-height:0;height:1px height=1 bgcolor=#dadada><img class=gmail-CToWUd src=https://app.mailgun.com/assets/pilot/images/templates/spacer.gif alt=\"\"border=0 style=display:block;border:0;outline:0 width=1 height=1><tr><td style=\"border-collapse:collapse;padding:0 25px\"class=m_1307995939901833592em_aside10 align=center valign=top><table cellpadding=0 align=center border=0 cellspacing=0 style=border-collapse:collapse width=100%><tr><td style=border-collapse:collapse;font-size:0;line-height:0;height:16px height=16> <tr><td style=border-collapse:collapse align=center valign=top><table cellpadding=0 align=left border=0 cellspacing=0 style=border-collapse:collapse class=m_1307995939901833592em_wrapper><tr><td style=border-collapse:collapse;font-family:Arial,sans-serif;font-size:11px;line-height:16px;color:#666 class=m_1307995939901833592em_grey align=center valign=middle>© Digital Booking 2023</table><tr><td style=border-collapse:collapse;font-size:0;line-height:0;height:16px height=16> </table></table></table></div></div></div><td class=Aq> </table></div></div><div id=:6f></div><div id=:75 class=ajR style=display:none role=button tabindex=-1><div id=:76 class=uC><img class=ajT src=//ssl.gstatic.com/ui/v1/icons/mail/images/cleardot.gif></div></div><div id=:6y><div id=:6z class=bA3><div id=:7v class=GM style=display:none><div></div></div><div id=:6n></div><div id=:6w style=height:40px></div></div></div></div></div><div id=:70 class=bv8></div></div></table><table cellpadding=0 align=center border=0 cellspacing=0 style=margin:auto width=100% role=presentation></table></div></center>";

        log.info("Sending email to: " + email);

        MimeMessage message = javaMailSender.createMimeMessage();
        var mesageHelper = new MimeMessageHelper(message, "utf-8");
        try {
            mesageHelper.setFrom("digitalbooking@ingenial.co", senderName);
            mesageHelper.setTo(email);
            mesageHelper.setSubject(subject);
            mesageHelper.setText(body, true);
            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            log.error("Error enviando el email: " + e.getMessage());
        }
    }
}
