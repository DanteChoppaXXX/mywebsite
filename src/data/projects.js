export const projects = [
  {
    slug: "distributed-kv-store",
    name: "Distributed Key-Value Store",
    description:
      "A Raft-based distributed key-value store with automatic leader election and log replication.",
    image: null,
    stack: ["Go", "Raft", "gRPC", "Docker"],
    github: "https://github.com/DanteChoppaxxx/distributed-kv-store",
    demo: null,
    featured: true,
    overview:
      "A key-value store designed to stay consistent and available across node failures, built to learn the Raft consensus protocol from the ground up rather than relying on an off-the-shelf implementation.",
    problem:
      "Single-node data stores are a hard limit on both availability and throughput. I wanted to understand, first-hand, how distributed consensus actually keeps replicas agreeing under network partitions and node crashes — not just use a library that does it.",
    goals: [
      "Implement leader election and log replication from the Raft paper",
      "Survive the loss of a minority of nodes without data loss",
      "Keep read/write latency predictable under replication",
      "Provide a gRPC API simple enough to drop into other services",
    ],
    architecture:
      "Each node runs a Raft state machine (follower/candidate/leader) over a replicated log. Writes are committed only after a majority of nodes acknowledge them; reads are served from the leader by default, with an optional follower-read mode for latency-sensitive callers. A gRPC layer exposes Get/Put/Delete, and cluster membership is defined via static config for now.",
    technicalDecisions: [
      "Chose gRPC over REST for lower-overhead inter-node RPCs",
      "Log entries are fsynced before acknowledging a write, trading some latency for durability",
      "Snapshotting compacts the log periodically instead of replaying full history on restart",
    ],
    challenges: [
      "Reasoning about split-brain scenarios during network partitions",
      "Getting leader election timeouts right — too aggressive and nodes fight for leadership, too slow and failover feels sluggish",
      "Testing consensus correctly required simulating partitions, not just process kills",
    ],
    lessonsLearned: [
      "Consensus algorithms are deceptively simple to describe and genuinely hard to implement correctly under failure",
      "Most of the real complexity lives in the edge cases the paper mentions in a single sentence",
    ],
    futureImprovements: [
      "Dynamic cluster membership changes without a restart",
      "Configurable consistency levels per request",
      "Pluggable storage backend (currently in-memory + snapshot to disk)",
    ],
    screenshots: [],
    architectureDiagram: null,
  },
  {
    slug: "packet-sniffer-toolkit",
    name: "Packet Sniffer Toolkit",
    description:
      "A lightweight CLI packet capture and analysis tool built on raw sockets, with protocol dissection down to TCP/UDP payloads.",
    image: null,
    stack: ["C", "Linux", "libpcap", "TCP/IP"],
    github: "https://github.com/DanteChoppaxxx/packet-sniffer-toolkit",
    demo: null,
    featured: true,
    overview:
      "A command-line tool for capturing and dissecting live network traffic, written to understand the network stack at the byte level rather than through a GUI abstraction like Wireshark.",
    problem:
      "It's easy to use a packet analyzer without understanding what it's actually parsing. I wanted to write the parser myself — Ethernet frame, IP header, TCP/UDP header, payload — to build a real mental model of how a packet is structured on the wire.",
    goals: [
      "Capture live traffic on a given interface using raw sockets",
      "Correctly parse Ethernet, IPv4, TCP, and UDP headers",
      "Support basic BPF-style filtering (by port, protocol, host)",
      "Print human-readable output comparable to tcpdump for common cases",
    ],
    architecture:
      "The tool opens a raw socket in promiscuous mode, reads frames into a ring buffer, and passes each frame through a chain of protocol dissectors (Ethernet → IP → TCP/UDP). Each dissector is a small, testable unit that reads a fixed header layout and hands the remaining bytes to the next layer.",
    technicalDecisions: [
      "Used raw sockets directly instead of libpcap initially, to force myself to handle framing manually; later added libpcap as an optional backend for portability",
      "Zero-copy parsing where possible — dissectors read into the existing buffer rather than allocating per packet",
    ],
    challenges: [
      "Correctly handling byte order (network vs. host) consistently across every header field",
      "Reassembling fragmented IP packets without leaking memory under sustained capture",
    ],
    lessonsLearned: [
      "Reading RFCs directly is slower but far more reliable than working from secondhand explanations",
      "Performance under sustained packet capture is a memory-management problem as much as a parsing one",
    ],
    futureImprovements: [
      "TLS handshake metadata parsing (no decryption, just visibility)",
      "Export captures to pcap format for interop with Wireshark",
    ],
    screenshots: [],
    architectureDiagram: null,
  },
  {
    slug: "async-http-server",
    name: "Async HTTP Server",
    description:
      "A high-performance, event-loop-based HTTP/1.1 server built from scratch on epoll, with zero external async runtime dependencies.",
    image: null,
    stack: ["Rust", "epoll", "HTTP/1.1", "Linux"],
    github: "https://github.com/DanteChoppaxxx/async-http-server",
    demo: null,
    featured: false,
    overview:
      "An HTTP server built directly on top of Linux's epoll interface rather than an existing async runtime, to understand what runtimes like Tokio are actually doing underneath their APIs.",
    problem:
      "Async runtimes hide the event loop almost entirely. I wanted to build a server that handles thousands of concurrent connections on a single thread by hand-rolling the reactor pattern, so the cost model of async I/O stopped being a black box.",
    goals: [
      "Handle high concurrent connection counts on a single thread via epoll",
      "Correctly implement HTTP/1.1 keep-alive and chunked transfer encoding",
      "Benchmark against a thread-per-connection baseline",
    ],
    architecture:
      "A single-threaded reactor registers client sockets with epoll in edge-triggered mode. Each connection is a small state machine (reading request line → headers → body → writing response) driven forward whenever epoll reports readiness, with no blocking syscalls on the hot path.",
    technicalDecisions: [
      "Edge-triggered over level-triggered epoll, which forced correct handling of partial reads/writes",
      "Hand-written HTTP parser instead of a crate, to control exactly which parts of the spec were supported",
    ],
    challenges: [
      "Avoiding starvation between connections when one connection sends a very large body",
      "Getting keep-alive connection lifecycle correct across timeouts and client-initiated closes",
    ],
    lessonsLearned: [
      "Edge-triggered epoll punishes any assumption that a single read() drains a socket",
      "A naive single-threaded reactor benchmarks surprisingly close to multi-threaded designs until CPU-bound work enters the picture",
    ],
    futureImprovements: [
      "Multi-threaded reactor with connection sharding across cores",
      "HTTP/2 support",
    ],
    screenshots: [],
    architectureDiagram: null,
  },
];
