/**
 * Blog post schema:
 * {
 *   slug: string,
 *   title: string,
 *   description: string,
 *   date: string,        — ISO format, e.g. "2026-06-01"
 *   readingTime: string, — e.g. "6 min read"
 *   tags: string[],
 *   content: Block[],    — hand-rolled content blocks, see below
 * }
 *
 * Block =
 *   { type: "paragraph", text: string }
 *   { type: "heading", text: string }
 *   { type: "code", code: string, language?: string }
 *   { type: "list", items: string[] }
 */
export const blogPosts = [
  {
    slug: "understanding-dns-resolution",
    title: "Understanding DNS Resolution",
    description:
      "What actually happens between typing a domain name and a browser getting an IP address back — resolvers, root servers, and why caching matters.",
    date: "2026-05-12",
    readingTime: "7 min read",
    tags: ["Networking", "DNS"],
    content: [
      {
        type: "paragraph",
        text: "DNS gets treated as a solved problem until it breaks, at which point it's usually the first thing anyone blames and the last thing anyone actually understands. The core idea is simple: translate a name a human can remember into an address a network can route to. The mechanism behind that translation is where most of the interesting behavior — and most of the outages — live.",
      },
      { type: "heading", text: "The resolution chain" },
      {
        type: "paragraph",
        text: "A lookup for www.example.com rarely goes straight to one authoritative source. Your machine asks a recursive resolver (often your ISP's or a public one like 1.1.1.1), which — if it doesn't already have the answer cached — walks the hierarchy: root servers point to the .com TLD servers, which point to example.com's authoritative nameservers, which finally return the A or AAAA record.",
      },
      {
        type: "list",
        items: [
          "Root servers know only where the TLD servers are, not final answers",
          "TLD servers know only where the authoritative nameservers are",
          "Authoritative nameservers hold the actual records for a zone",
          "Recursive resolvers do the walking and cache the result",
        ],
      },
      { type: "heading", text: "Why TTLs matter more than they look like they do" },
      {
        type: "paragraph",
        text: "Every record ships with a time-to-live, and that single number is a trade-off between propagation speed and load on authoritative servers. Set it too high and a DNS change (say, during a migration) takes hours to take effect everywhere. Set it too low and every resolver on the internet is re-asking your nameservers far more often than necessary.",
      },
      {
        type: "code",
        language: "text",
        code: "example.com.  300  IN  A  93.184.216.34\n              ^^^\n              TTL in seconds",
      },
      {
        type: "paragraph",
        text: "In practice, most of the DNS issues I've had to debug came down to one of two things: a stale cache holding an old record past when it should have expired, or a misconfigured TTL turning a planned five-minute cutover into a half-day incident.",
      },
    ],
  },
  {
    slug: "tcp-three-way-handshake-explained",
    title: "The TCP Three-Way Handshake, Explained",
    description:
      "SYN, SYN-ACK, ACK — why three packets, what each one actually establishes, and what a half-open connection looks like on the wire.",
    date: "2026-04-02",
    readingTime: "6 min read",
    tags: ["Networking", "TCP"],
    content: [
      {
        type: "paragraph",
        text: "Every reliable TCP connection starts the same way, and the handshake is doing more work than the mnemonic \"SYN, SYN-ACK, ACK\" suggests. It's not just a greeting — it's the moment both sides agree on initial sequence numbers, which is what makes reliable, ordered delivery possible for everything that follows.",
      },
      { type: "heading", text: "What each packet actually carries" },
      {
        type: "list",
        items: [
          "SYN — the client picks a random initial sequence number and sends it",
          "SYN-ACK — the server acknowledges the client's sequence number and sends its own",
          "ACK — the client acknowledges the server's sequence number; the connection is now established",
        ],
      },
      {
        type: "paragraph",
        text: "After this exchange, both sides know a starting number to count bytes from, which is what lets TCP detect lost, duplicated, or out-of-order segments later in the connection.",
      },
      { type: "heading", text: "Half-open connections and SYN floods" },
      {
        type: "paragraph",
        text: "If a SYN arrives and the server replies with SYN-ACK but never gets the final ACK, the connection sits half-open, consuming a slot in the server's backlog queue until it times out. Send enough SYNs without completing the handshake and you've built the basic mechanism behind a SYN flood — which is exactly why SYN cookies exist: they let a server avoid committing state until the handshake actually completes.",
      },
      {
        type: "code",
        language: "text",
        code: "tcpdump -i eth0 'tcp[tcpflags] & (tcp-syn) != 0'",
      },
      {
        type: "paragraph",
        text: "Watching a handshake in tcpdump or Wireshark once makes the abstraction click in a way that reading about it never quite does — you can see the sequence numbers increment in real time and match them against what the RFC describes.",
      },
    ],
  },
  {
    slug: "building-a-minimal-http-server",
    title: "Building a Minimal HTTP Server From Scratch",
    description:
      "What it takes to go from a raw TCP socket to a working HTTP/1.1 response — parsing requests, and the parts of the spec that are easy to skip until they break something.",
    date: "2026-03-10",
    readingTime: "9 min read",
    tags: ["Systems", "HTTP", "C"],
    content: [
      {
        type: "paragraph",
        text: "It's easy to treat HTTP as \"whatever a framework does for you.\" Building a minimal server from a raw socket is the fastest way to see how thin the protocol actually is underneath — and how many of the details a framework quietly gets right that are easy to get wrong by hand.",
      },
      { type: "heading", text: "The bare minimum" },
      {
        type: "paragraph",
        text: "At its simplest, an HTTP/1.1 server needs to: accept a TCP connection, read bytes until it has a complete request line and headers, parse the method and path, and write back a status line, headers, and a body. Every one of those steps has an edge case that a naive implementation will get wrong on the first try.",
      },
      {
        type: "code",
        language: "text",
        code: "GET /index.html HTTP/1.1\\r\\n\nHost: example.com\\r\\n\nConnection: keep-alive\\r\\n\n\\r\\n",
      },
      { type: "heading", text: "Details that are easy to skip until they matter" },
      {
        type: "list",
        items: [
          "Requests can arrive split across multiple TCP reads — you can't assume one read() gets a full request",
          "Keep-alive means a connection outlives a single request/response cycle",
          "Content-Length has to be exact, or clients will hang waiting for bytes that aren't coming",
          "Chunked transfer encoding is a different framing mechanism entirely, not just a header flag",
        ],
      },
      {
        type: "paragraph",
        text: "None of this is exotic — it's all in RFC 9110 and RFC 9112 — but reading the spec and getting a parser to survive a real browser's requests are two different levels of understanding. The gap between them is where most of the actual learning happens.",
      },
    ],
  },
  {
    slug: "linux-network-namespaces",
    title: "Linux Network Namespaces and How Containers Actually Isolate Traffic",
    description:
      "Containers don't have their own network stack by magic — network namespaces, veth pairs, and bridges are the primitives doing the work underneath.",
    date: "2026-02-18",
    readingTime: "8 min read",
    tags: ["Linux", "Containers", "Networking"],
    content: [
      {
        type: "paragraph",
        text: "\"Containers are isolated\" is true, but it hides where that isolation actually comes from. For networking specifically, the answer is a Linux kernel feature that predates Docker by years: network namespaces.",
      },
      { type: "heading", text: "What a namespace actually isolates" },
      {
        type: "paragraph",
        text: "A network namespace gives a process its own set of network interfaces, routing tables, and iptables rules, separate from the host's. Create a new namespace and it starts with nothing but a loopback interface — no eth0, no default route, no connectivity at all until something wires it up.",
      },
      {
        type: "code",
        language: "text",
        code: "ip netns add container1\nip netns exec container1 ip addr show",
      },
      { type: "heading", text: "veth pairs: the bridge between namespaces" },
      {
        type: "paragraph",
        text: "A virtual ethernet (veth) pair is two interfaces that act like opposite ends of a cable — anything sent into one comes out the other. Put one end inside the container's namespace and the other on the host, attach the host end to a bridge, and you have a path for traffic to leave the container and reach the rest of the network.",
      },
      {
        type: "list",
        items: [
          "Namespace — gives the container its own isolated network stack",
          "veth pair — the virtual cable connecting container to host",
          "Bridge — a virtual switch on the host joining multiple veth ends together",
          "iptables/NAT — translates container-internal addresses to routable ones",
        ],
      },
      {
        type: "paragraph",
        text: "Once you can see these four pieces individually, tools like Docker's default bridge network stop looking like magic and start looking like a specific, inspectable configuration of primitives that have been in the kernel for over a decade.",
      },
    ],
  },
];
