import { Box, Container } from "@mui/material";
import Header from "@/app/_components/header";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="bg-pink" sx={{ pt: 3 }}>
      <Container maxWidth="lg" className="wrapper" sx={{ mb: 3, p: 2 }}>
        <Header />
        <Box sx={{ mt: 3, mb: 3 }}>{children}</Box>
      </Container>
    </Box>
  );
}
