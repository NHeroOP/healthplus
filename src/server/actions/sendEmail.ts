import EmailTemplate from '@/components/EmailTemplate';
import resend from '@/server/resend';
import { ApiResponse } from '@/server/types/ApiResponse';


export default async function sendEmail(
  email: string,
  username: string,
  verifyToken: string,
): Promise<ApiResponse> {

  try {
    const { data, error } = await resend.emails.send({
      from: 'HealthPlus <send@noreply.nhero.me>',
      to: email,
      subject: "HealthPlus Verification Code",
      react: EmailTemplate({username, otp: verifyToken}),
    });

    console.log(error)

    if (error) {
      return {success: false, error: true, message: error.message}
    }
    
    return {success: true, error: false, message: "Verification email send successfully"}  
  } 
  catch (err) {
    console.error("Error while trying to send verification email", err)
    return {success: false, error: true, message: "Failed to send verification email"}
  }

};