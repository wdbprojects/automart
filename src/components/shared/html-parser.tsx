import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";

const HtmlParser = ({ html }: { html: string }) => {
  const sanitized = sanitizeHtml(html);
  const parsed = parse(sanitized);
  return parsed;
};
export default HtmlParser;
