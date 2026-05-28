#!/usr/bin/env python3
"""Local preview server with extensionless-URL fallback.

The production site serves clean URLs like /dashboard, /methodik, /quellen.
This script makes those work locally by trying `<path>.html` when the
exact path is missing.

    python3 scripts/serve.py [port]
"""
from __future__ import annotations

import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit


class CleanURLHandler(SimpleHTTPRequestHandler):
    def do_GET(self):  # noqa: N802 (stdlib API)
        self._rewrite_if_needed()
        return super().do_GET()

    def do_HEAD(self):  # noqa: N802 (stdlib API)
        self._rewrite_if_needed()
        return super().do_HEAD()

    def _rewrite_if_needed(self) -> None:
        parsed = urlsplit(self.path)
        url_path = parsed.path
        if not url_path or url_path.endswith("/"):
            return
        if "." in os.path.basename(url_path):
            return
        candidate_rel = url_path.lstrip("/")
        fs_path = os.path.join(os.getcwd(), candidate_rel)
        if os.path.isdir(fs_path) or os.path.isfile(fs_path):
            return
        if os.path.isfile(fs_path + ".html"):
            new_path = url_path + ".html"
            if parsed.query:
                new_path += "?" + parsed.query
            if parsed.fragment:
                new_path += "#" + parsed.fragment
            self.path = new_path


def main() -> int:
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    addr = ("", port)
    with ThreadingHTTPServer(addr, CleanURLHandler) as httpd:
        print(f"Serving HTTP on http://localhost:{port}/ (clean URL fallback)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
