const PDFDocument = ({ posts }) => (
    <Document>
      <Page>
        {posts.map((post) => (
          <Text key={post._id}>{post.title}</Text>
          // Render other post details as needed
        ))}
      </Page>
    </Document>
  );
  