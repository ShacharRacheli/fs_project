using Comp.Core.IServices;

namespace Comp.API.Jobs
{
    public class ChallengeExpirationJob : BackgroundService
    {
        //private readonly IServiceScopeFactory _serviceScopeFactory;
        //private readonly ILogger<ChallengeExpirationJob> _logger;

        //public ChallengeExpirationJob(IServiceScopeFactory serviceScopeFactory, ILogger<ChallengeExpirationJob> logger)
        //{
        //    _serviceScopeFactory = serviceScopeFactory;
        //    _logger = logger;
        //}

        //protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        //{
        //    while (!stoppingToken.IsCancellationRequested)
        //    {
        //        try
        //        {
        //            using (var scope = _serviceScopeFactory.CreateScope())
        //            {
        //                var challengeService = scope.ServiceProvider.GetRequiredService<IChallengeService>();

        //                _logger.LogInformation("Checking for expired challenges...");
        //                await challengeService.ProcessExpiredChallengesAsync();
        //                _logger.LogInformation("Finished processing expired challenges.");
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            _logger.LogError(ex, "Error processing expired challenges");
        //        }

        //        // חכי שעה לפני הבדיקה הבאה
        //        await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
        //    }
        //}
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly ILogger<ChallengeExpirationJob> _logger;

        public ChallengeExpirationJob(IServiceScopeFactory serviceScopeFactory, ILogger<ChallengeExpirationJob> logger)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var timer = new PeriodicTimer(TimeSpan.FromMinutes(1)); // בדיקה כל 15 דקות

            while (await timer.WaitForNextTickAsync(stoppingToken))
            {
                try
                {
                    using var scope = _serviceScopeFactory.CreateScope();
                    var challengeService = scope.ServiceProvider.GetRequiredService<IChallengeService>();

                    _logger.LogInformation("🔍 Checking for expired challenges...");
                    await challengeService.ProcessExpiredChallengesAsync();
                    _logger.LogInformation("✅ Finished processing expired challenges.");
                }
                catch (OperationCanceledException)
                {
                    _logger.LogInformation("🛑 ChallengeExpirationJob stopped.");
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "❌ Error processing expired challenges");
                }
            }
        }
        }
}
