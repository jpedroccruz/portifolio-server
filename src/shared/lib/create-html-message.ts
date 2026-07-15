import type { CreateMessageDTO } from "../../modules/message/dto/create-message.dto.js"

export function createHtmlMessage(data: CreateMessageDTO) {
	return `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin: 0; padding: 32px; background-color: #101010; font-family: Arial, Helvetica, sans-serif; color: #FFFFFF;">
      <table
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="100%"
        style="max-width: 640px; margin: 0 auto; background-color: #181818; border: 1px solid #2A2A2A; border-radius: 12px; overflow: hidden;"
      >
        <tr>
          <td style="padding: 32px;">
            <h1
              style="
                margin: 0 0 24px;
                font-size: 28px;
                font-weight: 700;
                color: #FFFFFF;
              "
            >
              New message from portfolio
            </h1>

            <table
              role="presentation"
              cellspacing="0"
              cellpadding="0"
              border="0"
              width="100%"
              style="margin-bottom: 32px;"
            >
              <tr>
                <td style="padding: 0 0 16px;">
                  <p style="margin: 0; color: #9E9E9E; font-size: 13px;">
                    Name
                  </p>

                  <p style="margin: 4px 0 0; font-size: 16px; color: #FFFFFF;">
                    ${data.name}
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <p style="margin: 0; color: #9E9E9E; font-size: 13px;">
                    Email
                  </p>

                  <p style="margin: 4px 0 0; font-size: 16px;">
                    <a
                      href="mailto:{{email}}"
                      style="color: #FFFFFF; text-decoration: none;"
                    >
                      ${data.email}
                    </a>
                  </p>
                </td>
              </tr>
            </table>

            <hr
              style="
                border: none;
                border-top: 1px solid #2A2A2A;
                margin: 0 0 24px;
              "
            />

            <h2
              style="
                margin: 0 0 16px;
                font-size: 18px;
                color: #FFFFFF;
              "
            >
              Message
            </h2>

            <div
              style="
                background: #101010;
                border: 1px solid #2A2A2A;
                border-radius: 10px;
                padding: 20px;
                line-height: 1.7;
                color: #E5E5E5;
                white-space: pre-wrap;
              "
            >
              ${data.message}
            </div>

            <p
              style="
                margin-top: 32px;
                font-size: 12px;
                color: #7A7A7A;
                text-align: center;
              "
            >
              This message was sent through your portfolio contact form.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}
